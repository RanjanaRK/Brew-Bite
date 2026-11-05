import type { NextFunction, Request, Response } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";
import env from "../configs/env.js";
import Admin from "../models/admin.model.js";
import { COOKIE_NAME } from "../utils/cookie.js";

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

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

    const admin = await Admin.findById(decoded.id).select(
      "_id role +tokenVersion",
    );

    if (!admin || decoded.tokenVersion !== admin.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // Attach admin details to Express request
    req.admin = {
      id: admin._id.toString(),
      role: "admin",
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};
