import { Router } from "express";

import {
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/auth.controller.js";

import {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
} from "../validators/auth.validator.js";
import validateRequest from "../middlewares/validateRequest.js";
import { protectAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// PUBLIC ROUTES

router.post("/login", loginValidator, login);

router.post("/forgot-password", forgotPasswordValidator, forgotPassword);

router.post("/reset-password/:token", resetPasswordValidator, resetPassword);

// PROTECTED ROUTES

router.post("/logout", protectAdmin, logout);

router.get("/me", protectAdmin, getMe);

router.patch(
  "/change-password",
  protectAdmin,
  changePasswordValidator,
  changePassword,
);

export default router;
