const oderDB = require("../../model/oder");
const productDB = require("../../model/product")
const usertDB = require("../../model/user")
const _ = require('lodash');
const moment = require("moment")
const Features = require("../../lib/feature")

exports.findAll = async (req, res) => {
    try {
        const features = new Features(
            oderDB.find(),
            req.query
        )
            .sorting()
            .paginating()
            .searching()
            .filtering();

        const counting = new Features(
            oderDB.find(),
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
        const oders = result[0].status === "fulfilled" ? result[0].value : [];
        const count = result[1].status === "fulfilled" ? result[1].value : 0;
        return res.status(200).json({ data: oders, count });
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
            oderDB.find({ id: id })
                .then((oder) => {
                    if (!oder) {
                        return res.status(404).json({
                            success: false,
                            messenger: "không có sản phẩm" + id,
                        });
                    } else {
                        return res.status(200).json({ data: oder });
                    }
                });
        } else {
            return res.status(404).json({
                success: false,
                messenger: "không tìm thấy mã sản phẩm"
            })
        }
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);

    oderDB.deleteOne({ id: id }).then(data => {
        data ? res.status(200).json({ success: true, messenger: " xoá thành công" }) : res.status(400).json({ success: false, messenger: "xoá thất bại" })
    }).catch(err => {
        res.status(400).json({ success: false, err })
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ messenger: "dữ liệu để cập nhật không được để trống" });
    }
    const id = req.params.id;
    if (req.body.state == 'Giao hàng thành công') {
        const decreaseProductByOrder = async (product) => {
            const productExists = await productDB.findById(product.product_id);
            if (!productExists) return

            const newProduct = productExists.detail.find(i => i.color == product.product_color);
            newProduct.quantity = newProduct.quantity - product.product_quantity

            await productDB.findByIdAndUpdate(product.product_id, {
                $pull: {
                    detail: { color: product.product_color }
                }
            });
            await productDB.findByIdAndUpdate(product.product_id, {
                $push: {
                    detail: newProduct
                },
                $inc: {
                    sale: product.product_quantity
                }
            });


        }
        Promise.all(req.body.product.map(async (i) => await decreaseProductByOrder(i)))

        const findProductByIdAndUpdate = async (product) => {
            const result = await productDB.findById(product.product_id);
            const exist = result.pre_order.find(item => item.color == product.product_color)
            if (exist.quantity - product.product_quantity == 0) {
                await productDB.findByIdAndUpdate(product.product_id, {
                    $pull: {
                        pre_order: { color: product.product_color }
                    }
                });
            } else {
                await productDB.findByIdAndUpdate(product.product_id, {
                    $pull: {
                        pre_order: { color: product.product_color }
                    }
                });
                await productDB.findByIdAndUpdate(product.product_id, {
                    $push: {
                        pre_order: { color: product.product_color, quantity: exist.quantity - product.product_quantity }
                    },
                });
            }
        }
        Promise.all(req.body.product.map(async (item) => await findProductByIdAndUpdate(item)))
    }

    oderDB.findByIdAndUpdate(id, req.body, { new: true })
        .then((oder) => {
            if (!oder) {
                res.status(404).json({
                    success: false,
                    messenger: `không thể cập nhật ${id}`,
                });
            } else {
                res.json({ success: true, data: oder });
            }
        })
        .catch((err) => {
            res
                .status(500)
                .json({ success: false, messenger: "lỗi update " });
        });
};

exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ messenger: "nội dung không được để trống!" });

    }
    const user = await usertDB.findById(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: "lỗi ko tìm thấy user", status: 404 })

    const oder = new oderDB({
        iduser: req.params.id,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        product: req.body.product,
        state: req.body.state,
        paymenttype: req.body.paymenttype,
        ship: req.body.ship,
        voucher: req.body.voucher,
        note: req.body.note,
    });
    console.log(req.body.product)

    try {
        const oders = await oder.save();
        const findProductByIdAndUpdate = async (product) => {
            const result = await productDB.findById(product.product_id);
            const exist = result.pre_order.find(item => item.color == product.product_color)
            if (exist) {
                await productDB.findByIdAndUpdate(product.product_id, {
                    $pull: {
                        pre_order: { color: product.product_color }
                    }
                });
                await productDB.findByIdAndUpdate(product.product_id, {
                    $push: {
                        pre_order: { color: product.product_color, quantity: product.product_quantity + exist.quantity }
                    },
                });
            } else {
                await productDB.findByIdAndUpdate(product.product_id, {
                    $push: {
                        pre_order: { color: product.product_color, quantity: product.product_quantity }
                    },
                });
            }
        }
        Promise.all(req.body.product.map(async (item) => await findProductByIdAndUpdate(item)))
        usertDB.findById(req.params.id).then((user, err) => {
            if (err) return res.status(404).json({ success: false, message: "lỗi ko tìm thấy user", status: 404 })
            else {
                user.orders.push(oders);
                user.cart =
                    user.cart.filter(array => !oders.product.some(filter => filter.product_id === array.product_id && filter.product_color === array.product_color));
                user.save();
                return res.json({ success: "true", data: oders });

            }
        })

    } catch (err) {
        return res.status(500).json({
            success: "false",
            messenger: err.message,
        });
    }
};


