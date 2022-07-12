const route = require("express").Router();

const { checkAuth, checkRole } = require("../../controller/auth/verify")
const odertController = require("../../controller/oder/oder");

//product
route.get("/find-all", odertController.findAll);
route.post("/create", odertController.create);
route.get("/find-one/:id", odertController.findOne);
route.delete("/delete/:id", odertController.delete);
route.put("/update/:id", odertController.update);


module.exports = route;