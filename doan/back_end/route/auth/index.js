const route = require("express").Router();
const controller = require("../../controller/auth/index")
const { checkAuth, checkRole } = require("../../controller/auth/verify")

route.post("/register", controller.register);
route.post("/login", controller.login);
route.post("/refresh", checkAuth, controller.refreshToken);
route.post("/logout", checkAuth, checkRole, controller.logout);




module.exports = route;