require("dotenv").config();

// import express
const express = require("express");
const app = express();

// express.json() middleware and link to "public" folders
app.use(express.static("./public"))
app.use(express.json());

// import connectDB
const connectDB = require("./db/connect"); 

// import main router
const mainRouter = require("./routes/main");
app.use("/api/v1", mainRouter);

// error middleware
const notFound = require("./middleware/notFound"); // when an unexistent route is entered by the user
app.use(notFound);

const errorHandler = require("./middleware/errorHandler"); // to handle 500 errors
app.use(errorHandler);



const _PORT = process.env.PORT || 3000; 

const start = async () => {
    try {
        await connectDB(); // try to connect to database
        // if successful, start server
        app.listen(_PORT, () => {
            console.log(`server listening at http://localhost:${_PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

start();