const productDB = require("../../model/product");
const supplierDB = require("../../model/supplier");
const userDB = require("../../model/user");
const cloudinary = require("../../helper/configCloudinary");
const productImage = require("../../model/imageProduct");
const oderDB = require("../../model/oder");
const _ = require('lodash');
const moment = require("moment")
const Features = require("../../lib/feature");


exports.findAll = async (req, res) => {
    // await productDB.updateMany({}, { madeIn: "Trung quốc" })
    try {
        const features = new Features(
            productDB.find().populate("image"),
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
        const newImport = new supplierDB({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            deliver: req.body.deliver,
            receiver: req.body.receiver,
            detail: req.body.detail
        })
        await newImport.save();
        const newBody = req.body.detail.reduce((acc, cur) => {
            const exist = acc.find(i => i.product_code == cur.product_code)
            if (exist) {
                return acc.map(item => {
                    if (item.product_code == cur.product_code) {
                        return {
                            ...item, detail: [...item.detail, { color: cur.color, quantity: cur.quantity }]
                            //  item.detail.reduce((ac, cu) => {
                            //     if (cu.color == cur.color) {
                            //         const newDetail = ac.map((a) => {
                            //             if (a.color == cu.color) {
                            //                 return { color: cu.color, quantity: cu.quantity + cur.quantity }
                            //             } else return a
                            //         })
                            //         return newDetail
                            //     } else {
                            //         return [...ac, { color: cur.color, quantity: cur.quantity }]
                            //     }
                            // }, [item.detail]).flat(Infinity)
                        }
                    } else return item
                })
            } else {
                return [...acc, {
                    product_code: cur.product_code, name: cur.product_name, size: cur.size, classify: cur.classify, price: cur.price,
                    style_lock: cur.style_lock, material: cur.material, nameNCC: req.body.name, madeIn: cur.madeIn, gender: cur.gender,
                    weight: cur.weight, insurance: cur.insurance,
                    strap_type: cur.strap_type, detail: [{ color: cur.color, quantity: cur.quantity }]
                }];
            }
        }, []);

        const addProductToProductBD = async (product) => {
            const productExist = await productDB.findOne({ product_code: product.product_code })
            if (productExist) {
                product.detail.map(async (item) => {
                    if (!productExist.detail.find(i => i.color == item.color)) {
                        await productDB.updateOne(
                            { product_code: product.product_code },
                            {
                                $push: {
                                    detail: {
                                        color: item.color,
                                        quantity: item.quantity
                                    }
                                }
                            }
                        )
                    } else {
                        await productDB.updateOne(
                            { product_code: product.product_code, "detail.color": item.color },
                            {
                                $inc: {
                                    "detail.$.quantity": item.quantity
                                }
                            }
                        )
                    }
                })


                if (productExist.historyImport.find(i => i.month == Number(moment(new Date()).format("M")))) {
                    await productDB.updateOne(
                        { product_code: product.product_code, "historyImport.month": Number(moment(new Date()).format("M")) },
                        {
                            $inc: {
                                "historyImport.$.qty": product.detail.reduce((acc, cur) => { return acc + cur.quantity }, 0)
                            }
                        }
                    )
                } else {
                    await productDB.updateOne(
                        { product_code: product.product_code },
                        {
                            $push: {
                                historyImport: { qty: product.detail.reduce((acc, cur) => { return acc + cur.quantity }, 0), month: Number(moment(new Date()).format("M")) }
                            }
                        }
                    )
                }
            } else {
                const productNew = new productDB({
                    product_code: product.product_code,
                    name: product.name,
                    size: product.size,
                    classify: product.classify,
                    detail: product.detail,
                    material: product.material,
                    origin_price: product.price,
                    style_lock: product.style_lock,
                    strap_type: product.strap_type,
                    nameNCC: req.body.name,
                    madeIn: product.madeIn, gender: product.gender,
                    weight: product.weight, insurance: product.insurance,
                    historyImport: [{
                        qty: product.detail.reduce((acc, cur) => { return acc + cur.quantity }, 0),
                        month: Number(moment(new Date()).format("M")),
                    }]
                });
                await productNew.save();
            }
        }
        Promise.all(newBody.map(async (item) => await addProductToProductBD(item)))




        // if (productExist) {
        //     if (productExist.historyImport.find(i => i.month == Number(moment(new Date()).format("M")))) {
        //         await productDB.updateOne(
        //             { product_code: req.body.product_code, "historyImport.month": Number(moment(new Date()).format("M")) },
        //             {
        //                 $inc: {
        //                     "historyImport.$.qty": req.body.detail.reduce((acc, item) => acc + item.quantity, 0)
        //                 }
        //             }
        //         )
        //     } else {
        //         await productDB.updateOne(
        //             { product_code: req.body.product_code },
        //             {
        //                 $push: {
        //                     historyImport: { qty: req.body.detail.reduce((acc, item) => acc + item.quantity, 0), month: Number(moment(new Date()).format("M")) }
        //                 }
        //             }
        //         )
        //     }


        //     const newDetail = req.body.detail.reduce((acc, cur) => {
        //         if (acc.find(i => i.color === cur.color)) {
        //             return acc.map(item => {
        //                 if (item.color == cur.color) {
        //                     return {
        //                         ...item, quantity: Number(item.quantity) + Number(cur.quantity)
        //                     }
        //                 } else return item

        //             })
        //         } else {
        //             return [...acc, cur]
        //         }
        //     }, productExist.detail)

        //     await productDB.updateOne({ product_code: req.body.product_code }, { detail: newDetail, discount: req.body.discount })
        // } else {
        //     const product = new productDB({
        //         product_code: req.body.product_code,
        //         name: req.body.name,
        //         price: Number(req.body.price) * 150 / 100,
        //         size: req.body.size,
        //         detail: req.body.detail,
        //         classify: req.body.classify,
        //         describe: req.body.describe,
        //         view: req.body.view,
        //         comments: req.body.comments,
        //         email: req.body.email,
        //         nameNCC: req.body.nameNCC, sale: 0,
        //         discount: req.body.discount,
        //         historyImport: [{
        //             qty: req.body.detail.reduce((acc, item) => acc + item.quantity, 0),
        //             month: Number(moment(new Date()).format("M")),
        //         }]
        //     });


        //     const products = await product.save();
        // res.json({ success: "true", data: products });
        res.json({ success: "true", message: "thêm thành công" });
    }


    catch (err) {
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

        const data = await productDB.find().populate("image")
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

        let totalProduct = data.reduce((acc, cur) => {
            if (!cur?.historyImport.find(i => i.month == req.body.month)) {
                return acc + 0
            } else
                return acc + cur?.historyImport.find(i => i.month == req.body.month).qty
        }, 0) - totalSale
        if (req.body.month == (new Date().getMonth())) {
            totalProduct == data.reduce((acc, cur) => acc + cur.quantity, 0)
        }

        const totalImport = data.reduce((acc, cur) => {
            if (!cur?.historyImport.find(i => i.month == req.body.month)) {
                return acc + 0
            } else
                return acc + cur.historyImport.find(i => i.month == req.body.month).qty
        }, 0)

        const Datatable = data.map(item => {
            const saleNum = oderSale.filter(i => i.product.find(vl => vl.product_id == item._doc._id)).map(vl => {
                return vl.product.filter(i => i.product_id == item._doc._id)
            }).flat(Infinity).reduce((a, c) => a + c.product_quantity, 0)
            return {
                ...item._doc,
                saleNum: saleNum,
                stockNum: item._doc.historyImport.find(
                    i => i.month == req.body.month
                )?.qty - saleNum || 0 - oderSale.filter(i => i.product.find(vl => vl.product_id == item._doc._id)).map(vl => {
                    return vl.product.filter(i => i.product_id == item._doc._id)
                }).flat(Infinity).reduce((a, c) => a + c.product_quantity, 0) - saleNum || 0,
                importNum: item._doc.historyImport.find(
                    i => i.month == req.body.month
                )?.qty || 0,
                image: item._doc.image.map(i => i.imageUrl)
            }
        })




        return res.status(200).json({ totalProduct, totalSale, totalImport, Datatable });
    } catch (err) {
        return res.status(500).send({
            success: false,
            messenger: err.messenger
        })
    }
}
exports.Comment = async (req, res) => {
    try {
        await productDB.findByIdAndUpdate(req.params.id, { $push: { comments: { author: req.body.author, avatar: req.body.avatar, content: req.body.content, rate: req.body.rate, datetime: req.body.datetime } } })
        return res.status(200).json({ message: "bình luận thành công" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


exports.totalIncome = async (req, res) => {
    try {
        const dataProduct = await productDB.find()
        const dataImport = await supplierDB.find()
        const dataUser = await userDB.find().count()
        const dataOrder = await oderDB.find({ state: "Giao hàng thành công" }).count()
        const dataRevenue = await oderDB.find({ state: "Giao hàng thành công" })
        const revenue = dataRevenue.reduce((acc, cur) => {
            return acc + cur.product.reduce((a, c) => {
                return a + c.product_quantity * c.product_price
            }, 0) * (100 - cur.voucher) / 100 + 30000
        }, 0)
        const totalMoneyImport = dataImport.reduce((acc, cur) => {
            return acc + cur.detail.reduce((a, c) => {
                return a + c.quantity * c.price
            }, 0)
        }, 0)
        return res.status(200).json({ data: [`${Math.round(revenue).toLocaleString()}đ`, dataOrder, dataUser, dataProduct.length, `${Math.round(revenue - totalMoneyImport).toLocaleString()}đ`] })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.totalIncomeByTime = async (req, res) => {
    try {
        const type = req.params.type
        if (type == "week") {
            const dateformat = "MM/DD/YYYY";
            function getWeekDaysByWeekNumber(weeknumber) {
                var date = moment().isoWeek(weeknumber || 1).startOf("week"), weeklength = 7, result = [];
                while (weeklength--) {
                    result.push(date.format(dateformat));
                    date.add(1, "day")
                }
                return result;
            }
            const getRevenueByWeek = async (day) => {

                const dataOrder = await oderDB.find({
                    state: "Giao hàng thành công", receiveddate: {
                        $gte: new Date(
                            day
                        ),
                        $lte: new Date(
                            new Date(day).getTime() + 24 * 60 * 60 * 1000
                        ),
                    },
                })
                const dataProduct = await productDB.find()

                const income = dataProduct.reduce((acc, cur) => {
                    return acc + cur.historyImport.find(i => i.month == new Date(day).getMonth() + 1)?.qty * (cur.price * 100 / 150)
                }, 0) || 0

                const revenue = dataOrder
                    .map((item) => {
                        return item.product.reduce((acc, i) => {
                            return acc + i.product_price * i.product_quantity;
                        }, 0) * (100 - item.voucher) / 100 + 30000
                    })
                    .reduce((acc, item) => {
                        return acc + item;
                    }, 0)
                if (moment(day).startOf('month').format("MM/DD/YYYY") == day) return { month: day, revenue: Math.round(revenue), income: income };
                return { month: day, revenue: Math.round(revenue), income: 0 };
            }
            Promise.all(
                getWeekDaysByWeekNumber(req.body.time).map((day) =>
                    getRevenueByWeek(day)
                )
            ).then(data => res.status(200).json({ data }))
            return
        }
        if (type == "month") {
            const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v, i) => new Date(year, month - 1, i + 1)).filter(v => v.getMonth() === month - 1)
            const getRevenueByDay = async (day) => {

                const dataOrder = await oderDB.find({
                    state: "Giao hàng thành công", receiveddate: {
                        $gte: new Date(
                            day
                        ),
                        $lte: new Date(
                            new Date(day).getTime() + 24 * 60 * 60 * 1000
                        ),
                    },
                })
                const dataProduct = await productDB.find()
                const dataIncome = await supplierDB.find({
                    created
                        : {
                        $gte: new Date(
                            day
                        ),
                        $lte: new Date(
                            new Date(day).getTime() + 24 * 60 * 60 * 1000
                        ),
                    },
                })
                const income = dataIncome.reduce((acc, cur) => {
                    return acc + cur.detail.reduce((a, c) => {

                        return a + c.quantity * c.price
                    }, 0)
                }, 0) || 0

                const revenue = dataOrder
                    .map((item) => {
                        return item.product.reduce((acc, i) => {
                            return acc + i.product_price * i.product_quantity;
                        }, 0) * (100 - item.voucher) / 100 + 30000
                    })
                    .reduce((acc, item) => {
                        return acc + item;
                    }, 0)
                return { month: "ngày " + moment(day).format("D"), revenue: Math.round(revenue), income };
            }

            Promise.all(
                getDaysInMonth(req.body.time, 2022).map((day) =>
                    getRevenueByDay(day)
                )
            ).then(data => res.status(200).json({ data }))
            return
        }
        const getRevenueByMonth = async (month) => {
            try {
                const dataOrder = await oderDB.find({
                    state: "Giao hàng thành công", receiveddate: {
                        $gte: new Date(
                            moment().month(month).startOf("month").format("MM/DD/YYYY")
                        ),
                        $lte: new Date(
                            moment().month(month).endOf("month").format("MM/DD/YYYY")
                        ),
                    },
                })
                const dataProduct = await productDB.find()
                const income = dataProduct.reduce((acc, cur) => {
                    return acc + cur.historyImport.find(i => i.month == month + 1)?.qty * (cur.price * 100 / 150)
                }, 0) || 0
                if (dataOrder.length == 0) return { month: `Tháng ${month + 1}`, revenue: 0, income: Math.round(income) };
                const revenue = dataOrder
                    .map((item) => {
                        return item.product.reduce((acc, i) => {
                            return acc + i.product_price * i.product_quantity;
                        }, 0) * (100 - item.voucher) / 100 + 30000
                    })
                    .reduce((acc, item) => {
                        return acc + item;
                    }, 0);
                return { month: `Tháng ${month + 1}`, revenue: Math.round(revenue), income: Math.round(income) };
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        }

        Promise.all(
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) =>
                getRevenueByMonth(month)
            )
        ).then(data => res.status(200).json({ data }))
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

exports.topProduct = async (req, res) => {
    try {
        const data = await oderDB.find({
            state: "Giao hàng thành công", receiveddate: {
                $gte: new Date(
                    moment()
                        .month(new Date().getMonth())
                        .startOf("month")
                        .format("MM/DD/YYYY")
                ),
                $lte: new Date(
                    moment()
                        .month(new Date().getMonth())
                        .endOf("month")
                        .format("MM/DD/YYYY")
                ),
            },
        })

        const productSale = await oderDB.find({
            state: "Giao hàng thành công", receiveddate: {
                $gte: new Date(
                    moment(new Date()).format("MM/DD/YYYY")
                ),

            },
        })
        const productByMaterial = productSale.map(item => {
            return item.product
        }).flat(Infinity)
            .reduce((acc, cur) => {
                const exist = acc.find(i => i.product_id == cur.product_id)
                if (exist) {
                    return acc.map(vl => {
                        if (vl.product_id == exist.product_id) {
                            return { ...vl, product_quantity: vl.product_quantity + cur.product_quantity }
                        } else {
                            return vl
                        }
                    })
                } else {
                    return [...acc, cur]
                }
            }, []).sort((a, b) => b.product_quantity - a.product_quantity).slice(0, 4)
            .filter(item => item.material == "Da bò" && item.gender == "Nam")


      


        const dataProduct = data.map(item => {
            return item.product
        }).flat(Infinity)
            .reduce((acc, cur) => {
                const exist = acc.find(i => i.product_id == cur.product_id)
                if (exist) {
                    return acc.map(vl => {
                        if (vl.product_id == exist.product_id) {
                            return { ...vl, product_quantity: vl.product_quantity + cur.product_quantity }
                        } else {
                            return vl
                        }
                    })
                } else {
                    return [...acc, cur]
                }
            }, []).sort((a, b) => b.product_quantity - a.product_quantity).slice(0, 4)


            
        const productSaleToDay = productSale.map(item => {
            return item.product
        }).flat(Infinity)
            .reduce((acc, cur) => {
                const exist = acc.find(i => i.product_id == cur.product_id)
                if (exist) {
                    return acc.map(vl => {
                        if (vl.product_id == exist.product_id) {
                            return { ...vl, product_quantity: vl.product_quantity + cur.product_quantity }
                        } else {
                            return vl
                        }
                    })
                } else {
                    return [...acc, cur]
                }
            }, []).sort((a, b) => b.product_quantity - a.product_quantity).slice(0, 4)



        return res.status(200).json({
            dataProduct, productSaleToDay, productByMaterial
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

