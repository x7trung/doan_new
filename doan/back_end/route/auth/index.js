const route = require("express").Router();
const controller = require("../../controller/auth/index")
const { checkAuth, checkRole } = require("../../controller/auth/verify")

route.post("/register", controller.register);
route.post("/login", controller.login);
route.put("/changepassword/:id", controller.changePassword);
route.post("/refresh", controller.refreshToken);
route.post("/logout", controller.logout);




module.exports = route;