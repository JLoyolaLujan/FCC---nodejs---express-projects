const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"]
    },
    price: {
        type: Number,
        required: [true, "product price must be provided"]
    },
    featured: {
        type: Boolean,
        default: false
    }, 
    rating: {
        type: Number, 
        default: 4.5
    },
    createdAt: {
        type: Date, 
        default: Date.now() // to set current time
    }, 
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"], // to limit number of companies
            message: "{VALUE} is not supported" // if user enters a company name that isn't in the list
        } 
    }
});

module.exports = mongoose.model("Product", productSchema);