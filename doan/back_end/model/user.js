const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 16,
        min: 8,
    },
    phone: {
        type: String,
    },
    Image: { type: mongoose.Schema.Types.ObjectId, ref: "imageuser" },
    sex: {
        type: String,
    },
    address: {
        type: String,
    },
    birth: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: Number,
        required: true,
    },
    orders: {
        type: Array,
    },
});
const usersDB = mongoose.model("users", userSchema);

module.exports = usersDB;