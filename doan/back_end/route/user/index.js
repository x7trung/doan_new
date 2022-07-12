const route = require("express").Router();

const { checkAuth, checkRole } = require("../../controller/auth/verify")
const index = require("../../controller/user/index");

//product
route.get("/find-all", index.findAll);
route.post("/create", index.create);
route.get("/find-one/:id", index.findOne);
route.delete("/delete/:id", index.delete);
route.put("/update/:id", index.update);
route.put(
    "/upload-image/:id",
    index.uploadUserImage
);

module.exports = route;