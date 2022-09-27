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
route.put(
    "/add-to-cart/:id",
    index.AddToCart
);
route.put(
    "/inc-to-cart/:id",
    index.IncToCart
);
route.put(
    "/dec-to-cart/:id",
    index.DecToCart
);
route.put(
    "/delete-to-cart/:id",
    index.DeleteToCart
);
route.delete(
    "/remove-all-cart/:id",
    index.RemoveAllCart
);
route.put(
    "/increase-like/:id",
    index.IncLike
);
route.put(
    "/decrease-like/:id",
    index.DecLike
);

module.exports = route;