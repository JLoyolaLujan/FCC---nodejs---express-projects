// import mongoose 
const mongoose = require("mongoose");

// since I'm using v5, I'll pass a few options I use to 
// omitt when using v6

// connect 

/*
mongoose.connect(`mongodb://127.0.0.1:27017/taskmanager`, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log("succesful db connection");
}).catch((err) => {
    console.log(`error: ${err}`);
});
*/

// the following set up is to execute the data base and THEN 
// the server

const connectDB = () => {
    return mongoose.connect(`mongodb://127.0.0.1:27017/taskmanager`, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: false,
        useUnifiedTopology: true
    })    
}

module.exports = connectDB;