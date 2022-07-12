const jwt = require("jsonwebtoken")
const Response = require("../../untils/errorResponse")

const checkAuth = (req, res, next) => {
    try {
        const token = req.header("auth-token")
        if (!token) return res.status(401).json(new Response("bạn chưa dăng nhập", "401"))
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.verified = verified
        next()
    } catch (error) {
        return res.status(401).json(new Response(error.message, "401"))
    }
}
const checkRole = (req, res, next) => {
    try {
        const token = req.header("auth-token")
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.role < 2) {
            return res.status(400).json(new Response("không được phép truy cập", "400"))
        }
        next()
    } catch (err) {
        return res.status(400).json(new Response(err.message, "400"))
    }
}

module.exports = { checkAuth, checkRole }