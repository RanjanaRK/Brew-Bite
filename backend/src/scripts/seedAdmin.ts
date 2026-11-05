import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import env from "../configs/env.js";

const seedAdmin = async () => {
  try {
    const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = env;

    // Validate environment variables
    if (!MONGO_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Missing required environment variables");
    }

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: ADMIN_EMAIL.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    // Create initial admin
    await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
      role: "admin",
    });

    console.log("Admin created successfully!");
  } catch (error) {
    console.error("Admin seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
