import type { NextFunction, Request, Response } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../configs/env.js";
import Admin from "../models/admin.model.js";

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // verify JWT

    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (!decoded.id || decoded.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // Check whether admin exists and is active
    const admin = await Admin.findById(decoded.id).select("_id role");

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
      return;
    }

    // Attach admin details to Express request
    req.admin = {
      id: admin._id.toString(),
      role: "admin",
    };

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};
