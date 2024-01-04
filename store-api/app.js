const express = require("express");
const app = express();

// express.json()
app.use(express.json());

// dotenv
require("dotenv").config();

// import middleware
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// import mongoose
const connectDB = require("./db/connect");

// import products router
const productsRouter = require("./routes/products");

// route (test)
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// route products
app.use("/api/v1/products", productsRouter);

// use of middleware
app.use(notFound);
app.use(errorHandler);

// listen 
const _PORT = process.env.PORT || 3000; 

const start = async () => {
    try {
        await connectDB(); // if succesful
        // start server
        app.listen(_PORT, () => {
            console.log(`Server listening at http://localhost:${_PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();