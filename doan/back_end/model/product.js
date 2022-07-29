const { required } = require("@hapi/joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_code: {
        type: String,
        required: true,
        unique: true,

    },
    name: {
        type: String,
        required: true,

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

    },
    view: {
        type: Number,
        default: 0
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
    orders: [{
        type: mongoose.Schema.Types.ObjectId, ref: "oder"
    }],

    discount: { type: Number, default: 0 },
    historySale: {
        type: Array,
        default: []
    },
    sale: { type: Number, default: 0 },
    created: { type: Date, default: new Date() },
    like: { type: Number },
    mate: { type: String }
});
const productDB = mongoose.model("product", productSchema);

module.exports = productDB;