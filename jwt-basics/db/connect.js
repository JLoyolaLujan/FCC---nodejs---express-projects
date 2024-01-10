// import mongoose
const mongoose = require("mongoose");

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI) // needs link
    .then(() => {
        console.log("successful db connection");
    })
    .catch((err) => {
        console.log(`error: ${err}`);
    })
}

module.exports = connectDB;