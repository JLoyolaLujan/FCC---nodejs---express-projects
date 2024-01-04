console.log('Task Manager App')
// import express
const express = require("express");
const app = express(); 

app.use(express.static("./public")); // to work with static files
app.use(express.json()); // middleware to use the json format

// import not-found middleware
const notFound = require("./middleware/not-found");

// import mongoose
const connectDB = require("./db/connect"); // to connect with mongoose

// import routes

const tasks = require("./routes/tasks");

// get (just to test)
/*
app.get("/hello", (req, res) => {
    res.send("Task Manager App");
});
*/

// routes (tasks)
app.use("/api/v1/tasks", tasks);

app.use(notFound);

// listen 
const PORT_3000 = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(); // if succesfull db connection
        // then start the server
        app.listen(PORT_3000, () => {
            console.log(`Server listening at http://localhost:${PORT_3000}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();