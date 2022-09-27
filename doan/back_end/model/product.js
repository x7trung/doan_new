
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
    },
    origin_price: {
        type: Number,
    },
    strap_type: {
        type: String,
    },
    style_lock: {
        type: String,
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
    },
    nameNCC: {
        type: String,
    },
    history: {
        type: Array,
    },
    madeIn: { type: String },
    gender: { type: String },
    weight: { type: Number },
    insurance: { type: Number },
    discount: { type: Number, default: 0 },
    sale: { type: Number, default: 0 },
    created: { type: Date, default: Date.now() },
    like: { type: Number, default: 0 },
    mate: { type: String },
    historyImport: {
        type: Array
    },
    material: {
        type: String
    },
    longs: {
        type: Number
    },
    pre_order: {
        type: Array
    }
});
const productDB = mongoose.model("product", productSchema);

module.exports = productDB;