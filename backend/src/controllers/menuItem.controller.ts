import type { Request, Response } from "express";
import MenuCategory from "../models/menuCategory.model.js";
import { MenuItem } from "../models/menuItem.model.js";
import { isValidObjectId } from "mongoose";

export const addMenuItem = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      foodType,
      isAvailable,
      isFeatured,
    } = req.body;

    // Check category ID
    if (!isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Check category exists and active
    const existingCategory = await MenuCategory.findOne({
      _id: category,
      isActive: true,
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Active category not found",
      });
    }

    // Create menu item
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      image,
      category,
      foodType,
      isAvailable,
      isFeatured,
    });

    return res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error) {
    console.error("Add menu item error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getAllMenuItems = async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      foodType,
      isAvailable,
      isFeatured,
      page = "1",
      limit = "10",
    } = req.query;

    const currentPage = Math.max(1, Number(page) || 1);
    const perPage = Math.min(50, Math.max(1, Number(limit) || 10));
    const skip = (currentPage - 1) * perPage;

    const filter: Record<string, unknown> = {};

    // Search by name
    if (typeof search === "string" && search.trim()) {
      filter.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // Filter by category
    if (typeof category === "string" && category) {
      if (!isValidObjectId(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      filter.category = category;
    }

    // Filter by food type
    if (foodType !== undefined) {
      if (foodType !== "veg" && foodType !== "non-veg") {
        return res.status(400).json({
          success: false,
          message: "Invalid food type",
        });
      }

      filter.foodType = foodType;
    }

    // Filter by availability
    if (isAvailable !== undefined) {
      if (isAvailable !== "true" && isAvailable !== "false") {
        return res.status(400).json({
          success: false,
          message: "Invalid isAvailable value",
        });
      }

      filter.isAvailable = isAvailable === "true";
    }

    // Filter by featured
    if (isFeatured !== undefined) {
      if (isFeatured !== "true" && isFeatured !== "false") {
        return res.status(400).json({
          success: false,
          message: "Invalid isFeatured value",
        });
      }

      filter.isFeatured = isFeatured === "true";
    }

    const [items, totalItems] = await Promise.all([
      MenuItem.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage),

      MenuItem.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: items.length,
      pagination: {
        totalItems,
        currentPage,
        totalPages: Math.ceil(totalItems / perPage),
        limit: perPage,
      },
      data: items,
    });
  } catch (error) {
    console.error("Get menu items error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const menuItem = await MenuItem.findById(id).populate(
      "category",
      "name slug",
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error("Get single menu item error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    const {
      name,
      description,
      price,
      image,
      category,
      foodType,
      isAvailable,
      isFeatured,
      isActive,
    } = req.body;

    // Verify new category if category is being changed
    if (category !== undefined) {
      if (!isValidObjectId(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID",
        });
      }

      const existingCategory = await MenuCategory.findOne({
        _id: category,
        isActive: true,
      });

      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Active category not found",
        });
      }

      menuItem.category = category;
    }

    // Update only provided fields
    if (name !== undefined) menuItem.name = name;
    if (description !== undefined) menuItem.description = description;
    if (price !== undefined) menuItem.price = price;
    if (image !== undefined) menuItem.image = image;
    if (foodType !== undefined) menuItem.foodType = foodType;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;
    if (isFeatured !== undefined) menuItem.isFeatured = isFeatured;
    // if (isActive !== undefined) menuItem.isActive = isActive;

    await menuItem.save();

    return res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error) {
    console.error("Update menu item error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    await MenuItem.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error("Delete menu item error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
