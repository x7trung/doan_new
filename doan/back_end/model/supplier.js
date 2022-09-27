
const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    created: { type: Date, default: Date.now() },
    deliver: { type: String, required: true },
    receiver: { type: String, required: true },
    detail: { type: Array }
});
const supplierDB = mongoose.model("supplier", supplierSchema);

module.exports = supplierDB;