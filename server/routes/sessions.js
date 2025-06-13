import express from "express";
import authMiddleware from "../middleware/auth.js";
import Session from "../models/Session.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { startTime, endTime, duration, taskId } = req.body;

  if (!startTime || !endTime || duration === undefined) {
    return res
      .status(400)
      .json({ msg: "Please provide start time, end time, and duration" });
  }

  try {
    const newSession = new Session({
      user: req.user.id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration,
      task: taskId,
    });

    const session = await newSession.save();
    res.status(201).json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
