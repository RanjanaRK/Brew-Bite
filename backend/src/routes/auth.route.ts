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

const authRouter = Router();

// PUBLIC ROUTES

authRouter.post("/login", loginValidator, login);

authRouter.post("/forgot-password", forgotPasswordValidator, forgotPassword);

authRouter.post(
  "/reset-password/:token",
  resetPasswordValidator,
  resetPassword,
);

// PROTECTED ROUTES

authRouter.post("/logout", protectAdmin, logout);

authRouter.get("/me", protectAdmin, getMe);

authRouter.patch(
  "/change-password",
  protectAdmin,
  changePasswordValidator,
  changePassword,
);

export default authRouter;
