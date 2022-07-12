const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const con = await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`kết nối thành công`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;