import { body, param } from "express-validator";
import validateRequest from "../middlewares/validateRequest.js";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description cannot exceed 300 characters"),
  validateRequest,
];

export const updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description cannot exceed 300 characters"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  validateRequest,
];

export const categoryIdValidator = [
  param("id").isMongoId().withMessage("Invalid category ID"),
  validateRequest,
];
