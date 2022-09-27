const route = require("express").Router();
const supplierController = require("../../controller/supplier/supplier");
route.get("/find-all", supplierController.findAll);
// route.get("/totalIncome", productController.totalIncome);
// route.post("/totalIncome-by/:type", productController.totalIncomeByTime);
// route.post("/find-total", productController.getTotalProduct);
// route.post("/create", productController.create);
// route.get("/find-one/:id", productController.findOne);
// route.delete("/delete/:id", productController.delete);
// route.put("/update/:msp", productController.update);


module.exports = route;