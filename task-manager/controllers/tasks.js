/*
get all
get by id
post 
patch
delete
*/

// import model (Task)
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
        // res.status(200).json({ tasks, amount:tasks.length });
        // res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({_id:id});
        // if task not found
        if (!task) {
            return res.status(404).json({ message: `no task with id ${id} found` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
}

const postTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
    
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndUpdate({_id:id}, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return res.status(404).json({ message: `no task with id ${id} found` });
        }
        res.status(200).json({ task }); // the original object is returned
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndDelete({_id:id});
        if (!task) {
            return res.status(404).json({ message: `no task with id ${id} found` });
        }
        res.status(200).json({ message: "Task deleted succesfully" });
    } catch (error) {
        res.status(500).send({ error: "Something went wrong, sorry!" });
    }
}

module.exports = {
    getAllTasks,
    getById,
    postTask,
    updateTask,
    deleteTask
}