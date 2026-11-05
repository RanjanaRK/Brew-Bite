import { body, param } from "express-validator";
import validateRequest from "../middlewares/validateRequest.js";

export const createMenuItemValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Food item name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid non-negative number")
    .toFloat(),

  body("image")
    .trim()
    .notEmpty()
    .withMessage("Food image is required")
    .isURL()
    .withMessage("Please provide a valid image URL"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("foodType")
    .notEmpty()
    .withMessage("Food type is required")
    .isIn(["veg", "non-veg"])
    .withMessage("Food type must be veg or non-veg"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean")
    .toBoolean(),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean")
    .toBoolean(),
  validateRequest,
];

export const updateMenuItemValidator = [
  param("id").isMongoId().withMessage("Invalid menu item ID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Food item name cannot be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid non-negative number")
    .toFloat(),

  body("image")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Image URL cannot be empty")
    .isURL()
    .withMessage("Please provide a valid image URL"),

  body("category").optional().isMongoId().withMessage("Invalid category ID"),

  body("foodType")
    .optional()
    .isIn(["veg", "non-veg"])
    .withMessage("Food type must be veg or non-veg"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean")
    .toBoolean(),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be a boolean")
    .toBoolean(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean")
    .toBoolean(),
  validateRequest,
];

export const menuItemIdValidator = [
  param("id").isMongoId().withMessage("Invalid menu item ID"),
  validateRequest,
];
