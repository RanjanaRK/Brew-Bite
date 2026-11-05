import { Router } from "express";

import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/menuCategory.controller.js";

import { protectAdmin } from "../middlewares/auth.middleware.js";
import {
  categoryIdValidator,
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/menuCategory.validator.js";

const categoryRouter = Router();

// All category management routes require admin authentication
// categoryRouter.use(protectAdmin);

categoryRouter.post("/", protectAdmin, createCategoryValidator, createCategory);
categoryRouter.get("/", protectAdmin, getAllCategories);
categoryRouter.get(
  "/:id",
  protectAdmin,
  categoryIdValidator,
  getSingleCategory,
);
categoryRouter.patch(
  "/:id",
  protectAdmin,
  updateCategoryValidator,
  updateCategory,
);
categoryRouter.delete(
  "/:id",
  protectAdmin,
  categoryIdValidator,
  deleteCategory,
);

export default categoryRouter;
