const mongoose = require("mongoose");

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log(`succesful db connection at ${process.env.MONGO_DB}`); 
    }).catch((err) => {
        console.log(`error: ${err}`);
    });
}

module.exports = connectDB;