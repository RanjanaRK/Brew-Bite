import cors from "cors";
import express from "express";
import connectDB from "./configs/db.js";

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check API
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Brew & Bite API is running successfully ☕",
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`☕ Brew & Bite server running on port ${PORT}`);
});
