const oderDB = require("../../model/oder");
const productDB = require("../../model/product")
const cloudinary = require("../../helper/configCloudinary");
const productImage = require("../../model/imageProduct");
const _ = require('lodash');
const { result } = require("lodash");


exports.findAll = (req, res) => {
    oderDB.find()
        .then((oders) => {
            return res.status(200).json({ data: oders });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                messenger: err.messenger || "lỗi! không hiển thị được tất cả sản phẩm"
            });
        })

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
            if (!productExists) return res.status(404).json({
                success: false,
                messenger: `không thể tìm sp có id là ${product._id}`,
            });
            const newProduct = productExists.detail.find(i => i.color == product.color);
            newProduct.quantity = newProduct.quantity - product.quantity

            await productDB.findByIdAndUpdate(product.product_id, {
                $pull: {
                    detail: { color: product.color }
                }
            });
            await productDB.findByIdAndUpdate(product.product_id, {
                $push: {
                    detail: newProduct
                }
            });
        }
        Promise.all(req.body.product.map(async (i) => await decreaseProductByOrder(i)))
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
        res.status(400).send({ messenger: "nội dung không được để trống!" });
        return;
    }
    const oder = new oderDB({
        iduser: req.body.iduser,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        product: req.body.product,
        state: req.body.state,
        oderdate: req.body.oderdate,
        receiveddate: req.body.receiveddate,
        paymenttype: req.body.paymenttype,
        ship: req.body.ship,
    });
    console.log(oder)

    try {
        const oders = await oder.save();
        res.json({ success: "true", data: oders });

    } catch (err) {
        res.status(500).json({
            success: "false",
            messenger: err.message,
        });
    }
};

// exports.uploadProductImage = async (req, res) => {
//     try {
//         if (_.isEmpty(req.files)) {
//             return res
//                 .status(400)
//                 .json({ status: "400", message: "body can not be empty" });
//         }
//         const productExists = await oderDB.findById(req.params.id);
//         if (!productExists) {
//             return res
//                 .status(400)
//                 .json({ status: "400", message: "oder not found" });
//         }

//         const uploads = async (path) => {
//             if (!path) return;
//             const newPath = await cloudinary.uploader.upload(path, {
//                 folder: productExists.name,
//             });
//             let newImage = new productImage({
//                 product_id: req.params.id,
//                 imageUrl: newPath.url,
//                 public_id: newPath.public_id,
//             });
//             // Save img
//             const result = await newImage.save();
//             return result;
//         };

//         let urls = [];
//         const files = req.files;
//         Promise.all(files.map((file) => uploads(file.path)))
//             .then((values) => {
//                 urls = values;
//                 return urls;
//             })
//             .then((urls) =>
//                 oderDB.findOne({ _id: req.params.id }).then((result, err) => {
//                     if (err) {
//                         return res.status(500).json({
//                             status: "500",
//                             message: "can not find oder",
//                         });
//                     } else {
//                         if (result.image.length == 0) {
//                             result.image = urls;
//                             result.save();
//                         } else {
//                             urls.forEach((url) => {
//                                 result.image.push(url);
//                             });
//                             result.save();
//                         }
//                         return res
//                             .status(200)
//                             .json({ status: "200", message: "images saved", data: result });
//                     }
//                 })
//             )
//             .catch((err) => {
//                 return res.status(400).json({ status: "400", message: err.message });
//             });
//     } catch (error) {
//         return res.status(400).json({ status: "400", message: error.message });
//     }
// };