const route = require("express").Router();

const { checkAuth, checkRole } = require("../../controller/auth/verify")
const productController = require("../../controller/product/product-controller");

//product
route.get("/find-all", productController.findAll);
route.post("/create", productController.create);
route.get("/find-one/:id", productController.findOne);
route.delete("/delete/:id", productController.delete);
route.put("/update/:id", productController.update);
route.put(
    "/upload-image/:id",
    productController.uploadProductImage
);

module.exports = route;