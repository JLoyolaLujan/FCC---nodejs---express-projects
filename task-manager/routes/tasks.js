// import express
const express = require("express");
const router = express.Router();
const { getAllTasks, getById, postTask, updateTask, deleteTask } = require("../controllers/tasks");
 
router.get("/", getAllTasks);
router.get("/:id", getById);
router.post("/", postTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask); 

module.exports = router;