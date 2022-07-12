const { required } = require("@hapi/joi");
const mongoose = require("mongoose");

const oderSchema = new mongoose.Schema({
    iduser: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    address: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
        max: 255,
        min: 8,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 8,
    },
    product: { type: Array },
    note: {
        type: String,
        max: 255,
        min: 8,
    },
    state: {
        type: String,
        max: 255,
        min: 8,
    },

    oderdate: {
        type: Date,
        default: Date.now(),
    },
    receiveddate: {
        type: Date,
        default: Date.now(),
    },
    paymenttype: {
        type: String,
        required: true,
    },
    voucher: {
        type: Number,
    },
    ship: {
        type: Number,
        required: true,
    }
});
const oderDB = mongoose.model("oder", oderSchema);

module.exports = oderDB;