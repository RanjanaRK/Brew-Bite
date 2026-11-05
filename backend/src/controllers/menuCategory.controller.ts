import type { Request, Response } from "express";
import MenuCategory from "../models/menuCategory.model.js";
import { MenuItem } from "../models/menuItem.model.js";

const generateSlug = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // // Check required field
    // if (!name || !name.trim()) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Category name is required",
    //   });
    // }

    const slug = generateSlug(name);

    // Check duplicate category
    const existingCategory = await MenuCategory.findOne({
      $or: [{ name: name.trim() }, { slug }],
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Create category
    const category = await MenuCategory.create({
      name: name.trim(),
      slug,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await MenuCategory.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 3. GET SINGLE CATEGORY
export const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await MenuCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Get category error:", error);

    return res.status(500).json({
      success: false,
      message: "Invalid category ID or server error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const category = await MenuCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const updateData: {
      name?: string;
      slug?: string;
      description?: string;
      isActive?: boolean;
    } = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Valid category name is required",
        });
      }

      const slug = generateSlug(name);

      const existingCategory = await MenuCategory.findOne({
        slug,
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Another category with this name already exists",
        });
      }

      updateData.name = name.trim();
      updateData.slug = slug;
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      updateData.description = description.trim();
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be a boolean",
        });
      }

      updateData.isActive = isActive;
    }

    const updatedCategory = await MenuCategory.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Update category error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    const category = await MenuCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check whether menu items use this category
    const menuItemsCount = await MenuItem.countDocuments({
      category: id,
    });

    if (menuItemsCount > 0) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete category because menu items are assigned to it",
        menuItemsCount,
      });
    }

    await MenuCategory.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
