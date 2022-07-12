const productDB = require("../../model/product");
const cloudinary = require("../../helper/configCloudinary");
const productImage = require("../../model/imageProduct");
const _ = require('lodash');
const { number } = require("@hapi/joi");


exports.findAll = async (req, res) => {
    productDB.find().populate("image")
        .then((products) => {
            return res.status(200).json({ data: products });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                messenger: err.messenger || "lỗi! không hiển thị được tất cả sản phẩm"
            });
        })

}

exports.findOne = (req, res) => {
    productDB.updateMany({}, { price: Number(req.body.price) * 150 / 100 }).then(res => res)
    if (req.params.id) {
        const id = req.params.id;

        if (id) {
            productDB.findById(id)
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
    const msp = req.params.msp;
    console.log(msp);

    productDB.deleteOne({ msp: msp }).then(data => {
        data ? res.status(200).json({ success: true, messenger: " xoá thành công" }) : res.status(400).json({ success: false, messenger: "xoá thất bại" })
    }).catch(err => {
        res.status(400).json({ success: false, err })
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ messenger: "dữ liệu để cập nhật không được để trống" });
    }
    const msp = req.params.msp;
    if (req.body.history) {
        console.log(req.body.history)
    }

    productDB.findOneAndUpdate({ msp }, req.body, { new: true })
        .then((product) => {
            if (!product) {
                res.status(404).json({
                    success: false,
                    messenger: `không thể cập nhật ${msp}`,
                });
            } else {
                res.json({ success: true, data: product });
            }
        })
        .catch((err) => {
            res
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
            await productDB.findByIdAndUpdate(productExist._id, {
                $push: {
                    history: {
                        size: req.body.size,
                        detail: req.body.detail,
                        price: Number(req.body.price),
                        created: Date.now(),
                    }
                }
            })
            const newDetail = req.body.detail.reduce((acc, cur) => {
                if (acc.find(i => i.color === cur.color)) {
                    return acc.map(item => {
                        if (item.color === cur.color) {
                            return {
                                ...item, quantity: `${Number(item.quantity) + Number(cur.quantity)}`
                            }
                        } else return item

                    })
                } else {
                    return [...acc, cur]
                }
            }, productExist.detail)

            await productDB.updateOne({ product_code: req.body.product_code }, { detail: newDetail })
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
                nameNCC: req.body.nameNCC,
                history: [{
                    size: req.body.size,
                    detail: req.body.detail,
                    price: req.body.price,
                    created: Date.now(),
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