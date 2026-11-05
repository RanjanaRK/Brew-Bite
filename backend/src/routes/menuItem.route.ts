import { Router } from "express";
import {
  createMenuItemValidator,
  menuItemIdValidator,
  updateMenuItemValidator,
} from "../validators/menuItem.validator.js";
import {
  getAllMenuItems,
  addMenuItem,
  deleteMenuItem,
  getSingleMenuItem,
  updateMenuItem,
} from "../controllers/menuItem.controller.js";

const itemRouter = Router();

itemRouter.post("/", createMenuItemValidator, addMenuItem);

itemRouter.get("/", getAllMenuItems);

itemRouter.patch("/:id", updateMenuItemValidator, updateMenuItem);

itemRouter.get("/:id", menuItemIdValidator, getSingleMenuItem);

itemRouter.delete("/:id", menuItemIdValidator, deleteMenuItem);

export default itemRouter;
