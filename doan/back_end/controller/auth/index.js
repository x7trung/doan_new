const usersDB = require("../../model/user");
const _ = require("lodash")
const {
    registerValidation,
    loginValition,
} = require("../../validate/validate");
const ErrorResponse = require("../../untils/errorResponse")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let arrRefreshToken = []

//dăng kí
exports.register = async (req, res) => {
    if (_.isEmpty(req.body)) {
        return res.status(400).json(new ErrorResponse("nội dung không thể trống!", 400))
    }

    const { error } = registerValidation(req.body)

    if (error) {
        return res.status(400).json(new ErrorResponse(error.details[0].message, 400))
    }
    const user = await usersDB.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json(new ErrorResponse("email đã tồn tại!", 400))
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new usersDB({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,

    })
    try {
        const saveUser = await newUser.save();
        return res.status(200).json(new ErrorResponse("tạo tài khoản thành công", 200, saveUser))
    } catch (err) {
        return res.status(400).json(new ErrorResponse(err.message, 400))
    }
}

//dăng nhập
exports.login = async (req, res) => {
    if (_.isEmpty(req.body)) {
        return res.status(400).json(new ErrorResponse("tài khoản không để trống!", 400))
    }
    const { error } = loginValition(req.body);
    if (error) {
        return res.status(400).json(new ErrorResponse(error.details[0].message, 400))
    }
    try {
        const user = await usersDB.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json(new ErrorResponse("tài khoản chưa đăng kí", 400))
        } else {
            //check password
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).json(new ErrorResponse("sai tài khoản hoặc mật khẩu", 400))
            } else {

                const { _id, name, email, role, ...rest } = user;
                const token = jwt.sign({ _id, name, email, role },
                    process.env.TOKEN_SECRET, {
                    expiresIn: "500s",
                }
                );
                const refreshToken = jwt.sign({ _id, name, email, role },
                    process.env.TOKEN_REFRESH, {
                    expiresIn: "365d",
                }
                );
                arrRefreshToken.push(refreshToken);
                res.header("auth-token", token);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });

                return res.status(200).json(new ErrorResponse("đăng nhập thành công", 200, { token, refreshToken }))
            }


        }
    } catch (error) {
        console.log(error)
    }
}
exports.refreshToken = async (req, res) => {

    const refreshToken = req.headers.cookie.substring(
        req.headers.cookie.indexOf("=") + 1
    );

    if (!refreshToken) {
        return res.status(400).json(new ErrorResponse("không thể xác thực!", 400));
    }
    if (!arrRefreshToken.includes(refreshToken)) {
        return res.status(400).json(new ErrorResponse("refresh token không hợp lệ", 400))
    }
    jwt.verify(refreshToken, process.env.TOKEN_REFRESH, (err, user) => {
        if (err) {
            return res.status(400).json(new ErrorResponse(err.message, 400));
        }
        const { _id, name, email, role, ...rest } = user;
        arrRefreshToken = arrRefreshToken.filter((token) => token !== refreshToken);
        const newAccessToken = jwt.sign({ _id, name, email, role },
            process.env.TOKEN_SECRET, {
            expiresIn: "200s",
        }
        );
        const newRefreshToken = jwt.sign({ _id, name, email, role },
            process.env.TOKEN_REFRESH, {
            expiresIn: "365d",
        });
        arrRefreshToken.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });
        res.status(200).json({
            status: 200,
            message: "làm mới thành công",
            token: newAccessToken,

        });
    });
};
// đăng xuất
exports.logout = (req, res) => {

    console.log("đăng xuất thành công")
}
