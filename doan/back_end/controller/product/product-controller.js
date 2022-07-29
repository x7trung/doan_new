const productDB = require("../../model/product");
const cloudinary = require("../../helper/configCloudinary");
const productImage = require("../../model/imageProduct");
const oderDB = require("../../model/oder");
const _ = require('lodash');
const moment = require("moment")
const Features = require("../../lib/feature")

exports.findAll = async (req, res) => {
    // await productDB.updateMany({}, { mate: "da" })
    try {
        const features = new Features(
            productDB.find().populate("image").populate("orders"),
            req.query
        )
            .sorting()
            .paginating()
            .searching()
            .filtering();

        const counting = new Features(
            productDB
                .find(),

            req.query
        )
            .sorting()
            .searching()
            .filtering()
            .counting();

        const result = await Promise.allSettled([
            features.query,
            counting.query, //count number of user.
        ]);
        const products = result[0].status === "fulfilled" ? result[0].value : [];
        const count = result[1].status === "fulfilled" ? result[1].value : 0;
        return res.status(200).json({ data: products, count });
    } catch (err) {
        return res.status(500).send({
            success: false,
            messenger: err.messenger || "lỗi! không hiển thị được tất cả sản phẩm"
        });
    }
}

exports.findOne = (req, res) => {

    if (req.params.id) {
        const id = req.params.id;

        if (id) {
            productDB.findById(id).populate("image")
                .then((product) => {
                    if (!product) {
                        res.status(404).json({
                            success: false,
                            messenger: "không có sản phẩm" + id,
                        });
                    } else {
                        res.json({ data: product });
                    }
                });
        } else {
            res.status(404).json({
                success: false,
                messenger: "không tìm thấy mã sản phẩm"
            })
        }
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;
    productDB.findByIdAndDelete(id).then(data => {
        return res.status(200).json({ status: 200, message: "xoá thành công" })
    }).catch(err => {
        return res.status(400).json({ success: false, err: err.message })
    })
}

exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ messenger: "dữ liệu để cập nhật không được để trống" });
    }
    const msp = req.params.msp;
    if (req.body.history) {

        const data = await productDB.findOne({ product_code: msp })
        console.log(req.body.history.created)
        const changeValue = req.body.history.quantity - data.history.filter(item => item.created == req.body.history.created).slice(-1)[0].detail.find(item => item.color == req.body.history.color).quantity

        if (changeValue == 0) return res.status(200).json({ success: true, message: "update thành công", data: data });

        productDB.findOne({ product_code: msp }).then((result, err) => {
            if (err) {
                return res.status(404).json({
                    success: false,
                    messenger: err.message,
                });
            } else {

                result.detail = result.detail.map(item => {
                    if (item.color == req.body.history.color) {
                        return { ...item, quantity: item.quantity + changeValue }
                    } else return item
                })

                if (result.history.find(i => i.created == req.body.history.created)) {
                    result.history = result.history.map(i => {
                        if (i.created == req.body.history.created) {
                            return {
                                ...i, detail: i.detail.map(item => {
                                    if (item.color == req.body.history.color) {
                                        return { ...item, quantity: req.body.history.quantity }
                                    } else return item
                                })
                            }
                        } else return i
                    })
                } else result.history = {
                    ...result.history[0], detail: result.history[0].detail.map(item => {
                        if (item.color == req.body.history.color) {
                            return { ...item, quantity: req.body.history.quantity }
                        } else return item
                    })
                }


                result.save()
                return res.status(200).json({ success: true, message: "update thành công", data: result });
            }
        }).catch(err => {
            return res
                .status(500)
                .json({ success: false, messenger: err.message });
        })

    } else

        productDB.findOneAndUpdate({ product_code: msp }, req.body, { new: true })
            .then((product) => {
                if (!product) {
                    return res.status(404).json({
                        success: false,
                        messenger: `không thể cập nhật ${msp}`,
                    });
                } else {
                    return res.status(200).json({ success: true, data: product });
                }
            })
            .catch((err) => {
                return res
                    .status(500)
                    .json({ success: false, messenger: "lỗi update " });
            });
};

exports.create = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ messenger: "nội dung không được để trống!" });
            return;
        }
        const productExist = await productDB.findOne({ product_code: req.body.product_code })
        if (productExist) {
            await productDB.updateOne(
                { product_code: req.body.product_code, "history.created": Number(moment(new Date()).format("M")) },
                { $set: { "history.$.detail": req.body.detail } }
            )

            const newDetail = req.body.detail.reduce((acc, cur) => {
                if (acc.find(i => i.color === cur.color)) {
                    return acc.map(item => {
                        if (item.color == cur.color) {
                            return {
                                ...item, quantity: Number(item.quantity) + Number(cur.quantity)
                            }
                        } else return item

                    })
                } else {
                    return [...acc, cur]
                }
            }, productExist.detail)

            await productDB.updateOne({ product_code: req.body.product_code }, { detail: newDetail, discount: req.body.discount })
        } else {
            const product = new productDB({
                product_code: req.body.product_code,
                name: req.body.name,
                price: Number(req.body.price) * 150 / 100,
                size: req.body.size,
                detail: req.body.detail,
                classify: req.body.classify,
                describe: req.body.describe,
                view: req.body.view,
                comments: req.body.comments,
                email: req.body.email,
                nameNCC: req.body.nameNCC, sale: 0,
                discount: req.body.discount,
                history: [{
                    size: req.body.size,
                    detail: req.body.detail,
                    price: req.body.price,
                    created: new Date().getMonth() + 1,
                }]
            });


            const products = await product.save();
            res.json({ success: "true", data: products });
        }


    } catch (err) {
        res.status(500).json({
            success: "false",
            messenger: err.message,
        });
    }
};

exports.uploadProductImage = async (req, res) => {
    try {
        if (_.isEmpty(req.files)) {
            return res
                .status(400)
                .json({ status: "400", message: "body can not be empty" });
        }
        const productExists = await productDB.findById(req.params.id);
        if (!productExists) {
            return res
                .status(400)
                .json({ status: "400", message: "product not found" });
        }

        const uploads = async (path) => {
            if (!path) return;
            const newPath = await cloudinary.uploader.upload(path, {
                folder: productExists.name,
            });
            let newImage = new productImage({
                product_id: req.params.id,
                imageUrl: newPath.url,
                public_id: newPath.public_id,
            });
            // Save img
            const result = await newImage.save();
            return result;
        };

        let urls = [];
        const files = req.files;
        Promise.all(files.map((file) => uploads(file.path)))
            .then((values) => {
                urls = values;
                return urls;
            })
            .then((urls) =>
                productDB.findOne({ _id: req.params.id }).then((result, err) => {
                    if (err) {
                        return res.status(500).json({
                            status: "500",
                            message: "can not find product",
                        });
                    } else {
                        if (result.image.length == 0) {
                            result.image = urls;
                            result.save();
                        } else {
                            urls.forEach((url) => {
                                result.image.push(url);
                            });
                            result.save();
                        }
                        return res
                            .status(200)
                            .json({ status: "200", message: "images saved", data: result });
                    }
                })
            )
            .catch((err) => {
                return res.status(400).json({ status: "400", message: err.message });
            });
    } catch (error) {
        return res.status(400).json({ status: "400", message: error.message });
    }
};



exports.getTotalProduct = async (req, res) => {
    try {

        const data = await productDB.find()


        const oderSale = await oderDB.find({
            state: "Giao hàng thành công",
            receiveddate: {
                $gte: new Date(
                    moment()
                        .month(Number(req.body.month) - 1)
                        .startOf("month")
                        .format("MM/DD/YYYY")
                ),
                $lte: new Date(
                    moment()
                        .month(Number(req.body.month) - 1)
                        .endOf("month")
                        .format("MM/DD/YYYY")
                ),
            },
        })
        const totalSale = oderSale.reduce((acc, cur) => {
            return acc + cur.product.reduce((a, c) => {
                return a + c.product_quantity
            }, 0)
        }, 0)
        if (data.map(item => { return item.history.filter(i => (req.body.month) == i.created) }).flat(Infinity) == 0)
            return res.status(200).json({ totalProduct: 0, totalSale: 0, newProductGoods: 0 });
        const totalProduct = data.map(item => { return item.history.filter(i => req.body.month == i.created).slice(-1) }).flat(Infinity).reduce((acc, cur) => {
            return acc + cur.detail.reduce((a, c) => {
                return a + c.quantity
            }, 0)
        }, 0) - totalSale

        const productGoods = data.map(item => { return item.history.filter(i => req.body.month == i.created).slice(-1) }).flat(Infinity).reduce((acc, cur) => {
            return acc + cur.detail.reduce((a, c) => {
                return a + c.quantity
            }, 0)
        }, 0)
        const a = data.map(item => { return item.history.filter(i => (req.body.month - 1) == i.created) }).flat(Infinity)
        if (a == 0) {
            return res.status(200).json({ totalProduct, totalSale, newProductGoods: productGoods });
        }
        const newProductGoods = productGoods - data.map(item => { return item.history.filter(i => (req.body.month - 1) == i.created).slice(-1) }).flat(Infinity).reduce((acc, cur) => {
            return acc + cur.detail.reduce((a, c) => {
                return a + c.quantity
            }, 0)
        }, 0)
        return res.status(200).json({ totalProduct, totalSale, newProductGoods });
    } catch (err) {
        return res.status(500).send({
            success: false,
            messenger: err.messenger
        })
    }
}

