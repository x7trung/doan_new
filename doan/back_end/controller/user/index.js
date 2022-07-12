const usersDB = require("../../model/user");
const cloudinary = require("../../helper/configCloudinary");
const ImageUserDB = require("../../model/userImg");
const bcrypt = require("bcryptjs");
const _ = require('lodash')


exports.findAll = (req, res) => {
    usersDB.find().populate("Image")
        .then((users) => {
            return res.status(200).json({ data: users });
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                messenger: err.message
            });
        })

}

exports.findOne = (req, res) => {

    if (req.params.id) {
        const id = req.params.id;
        if (id) {
            usersDB.findById(id)
                .then((user) => {
                    if (!user) {
                        return res.status(404).json({
                            success: false,
                            messenger: "không có sản phẩm" + id,
                        });
                    } else {
                        return res.json({ data: user });
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

    usersDB.deleteOne({ id: id }).then(data => {
        return res.status(200).json({ success: true, messenger: " xoá thành công" })
    }).catch(err => {
        return res.status(400).json({ success: false, messenger: err.message })
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ messenger: "dữ liệu để cập nhật không được để trống" });
    }
    const id = req.params.id;

    usersDB.findOneAndUpdate({ id: id }, req.body, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    messenger: `không thể cập nhật ${id}`,
                });
            } else {
                return res.json({ success: true, data: user });
            }
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ success: false, messenger: err.message });
        });
};

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ messenger: "nội dung không được để trống!" });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new usersDB({
        name: req.body.name,
        password: hashedPassword,
        phone: req.body.phone,
        sex: req.body.sex,
        address: req.body.address,
        birth: req.body.birth,
        role: req.body.role,
        email: req.body.email,
    });

    try {
        const users = await user.save();
        return res.json({ success: "true", data: users });

    } catch (err) {
        return res.status(500).json({
            success: "false",
            messenger: err.message,
        });
    }
};

exports.uploadUserImage = async (req, res) => {
    try {
        if (_.isEmpty(req.files)) {
            return res
                .status(400)
                .json({ status: "400", message: "body can not be empty" });
        }
        const userExists = await usersDB.findById(req.params.id);
        if (!userExists) {
            return res
                .status(400)
                .json({ status: "400", message: "user not found" });
        }

        const uploads = async (path) => {
            if (!path) return;
            const newPath = await cloudinary.uploader.upload(path, {
                folder: userExists.name,
            });
            let newImage = new ImageUserDB({
                user_id: req.params.id,
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
                usersDB.findOne({ _id: req.params.id }).then((result, err) => {
                    if (err) {
                        return res.status(500).json({
                            status: "500",
                            message: "can not find user",
                        });
                    } else {

                        result.Image = urls[0];
                        result.save();
                    }
                    return res
                        .status(200)
                        .json({ status: "200", message: "images saved", data: result });

                })
            )
            .catch((err) => {
                return res.status(400).json({ status: "400", message: err.message });
            });
    } catch (error) {
        return res.status(400).json({ status: "400", message: error.message });
    }
};