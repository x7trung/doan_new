require("dotenv").config({ path: "./config.env" });
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("./database/connect")
const { uploads } = require("./until/multer");
const cors = require("cors");

connectDB();
const PORT = process.env.PORT || 8000;

app.use(uploads);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", require("./route/auth/index"))
app.use("/product", require("./route/product/index"))
app.use("/user", require("./route/user/index"))
app.use("/oder", require("./route/oder/index"))


app.listen(PORT, () => {
    console.log(`server run on http://localhost:${PORT}`);
});