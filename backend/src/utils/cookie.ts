import type { CookieOptions } from "express";
import env from "../configs/env.js";

export const COOKIE_NAME = "adminToken";

export const adminCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

export const clearAdminCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "none",
  path: "/",
};

export const ADMIN_COOKIE_NAME = "adminToken";
