import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import sessionRoutes from "./routes/sessions.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);

app.get("/api", (req, res) => {
  res.send("Hello from the DailyWorks API!");
});

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
path.join(__dirname, "client", "dist", "index.html");
app.use(express.static(path.join(__dirname, "client/dist")));

// app.get("/*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

// Explicitly handle all possible React routes
app.get(["/", "/login", "/signup"], (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error.message);
  });
