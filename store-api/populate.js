// to dynamicaly add multiple items to a database at once
require("dotenv").config();

// to connect with mongoose from here is necesary 
const connectDB = require("./db/connect");

// product schema
const Product = require("./models/products");

// the data we want to pass to the database
const jsonProducts = require("./products.json");

// we aren't going to connect with "app.listen", we simply want to connect to the database

const start = async () => {
    try {
        await connectDB();
        await Product.deleteMany(); // to delete all products in the database
        await Product.create(jsonProducts); // to add the list of products into the database
        process.exit(0); // to exit the process
    } catch (error) {
        console.log(error);
        process.exit(1); // in case there was an error
    }
}

start();