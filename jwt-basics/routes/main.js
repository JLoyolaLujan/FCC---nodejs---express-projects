// import express
const express = require("express");

// router
const router = express.Router();

// import authorization middleware 
const authMiddleware = require("../middleware/auth");

// import controller functions
const { login, dashboard } = require("../controllers/main");

// setting routes
router.get("/dashboard", authMiddleware, dashboard); // to get info
router.post("/login", login); // to post info

module.exports = router;