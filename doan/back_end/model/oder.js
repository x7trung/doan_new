const { required } = require("@hapi/joi");
const mongoose = require("mongoose");

const oderSchema = new mongoose.Schema({
    iduser: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    product: { type: Array },
    note: {
        type: String,

    },
    state: {
        type: String,

    },

    oderdate: {
        type: Date,
        default: Date.now(),
    },
    receiveddate: {
        type: Date,

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