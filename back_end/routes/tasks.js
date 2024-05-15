const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        text: req.body.text,
        completed: false
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Mark a task as completed
router.put('/:id/complete', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = true;
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
});

module.exports = router;
