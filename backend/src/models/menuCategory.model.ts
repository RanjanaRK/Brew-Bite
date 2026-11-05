import mongoose from "mongoose";

export interface IMenuCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

const menuCatgeorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const MenuCategory = mongoose.model<IMenuCategory>(
  "MenuCategory",
  menuCatgeorySchema,
);

export default MenuCategory;
