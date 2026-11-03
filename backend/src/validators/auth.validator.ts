import { body, param } from "express-validator";
import validateRequest from "../middlewares/validateRequest.js";

// LOGIN VALIDATOR
export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email."),

  body("password").notEmpty().withMessage("Password is required."),
  validateRequest,
];

// FORGOT PASSWORD VALIDATOR
export const forgotPasswordValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email."),
  validateRequest,
];

// RESET PASSWORD VALIDATOR
export const resetPasswordValidator = [
  param("token").notEmpty().withMessage("Reset token is required."),

  body("password")
    .notEmpty()
    .withMessage("New password is required.")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters."),
  validateRequest,
];

// CHANGE PASSWORD VALIDATOR
export const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required.")
    .bail()
    .isLength({ min: 8, max: 128 })
    .withMessage("New password must be between 8 and 128 characters."),
  validateRequest,
];
