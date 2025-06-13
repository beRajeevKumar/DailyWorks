import express from "express";
import authMiddleware from "../middleware/auth.js";
import Task from "../models/Task.js";

const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  try {
    const newTaskData = {
      user: req.user.id,
      title,
      description,
      priority,
    };
    if (dueDate) {
      newTaskData.dueDate = dueDate;
    }
    const newTask = new Task(newTaskData);

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, completed, dueDate, priority } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (completed !== undefined) taskFields.completed = completed;
    if (priority) taskFields.priority = priority;

    if (dueDate) {
      taskFields.dueDate = dueDate;
    } else if (dueDate === null || dueDate === "") {
      taskFields.dueDate = null;
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
