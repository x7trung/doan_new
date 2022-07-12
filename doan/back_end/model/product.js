const { required } = require("@hapi/joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_code: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255,
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    size: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,

    },
    detail: {
        type: Array,
        required: true
    },
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: "imageproducts" }],
    classify: {
        type: String,
    },
    describe: {
        type: String,
        max: 255,
        min: 8,
    },
    view: {
        type: Number,
        max: 255,
        min: 8,
    },

    comments: {
        type: Array,
    },
    email: {
        type: String,
        required: true,
    },
    nameNCC: {
        type: String,
        required: true,
    },
    history: {
        type: Array,
    },
});
const productDB = mongoose.model("product", productSchema);

module.exports = productDB;