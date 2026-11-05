import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: mongoose.Types.ObjectId;
  foodType: "veg" | "non-veg";
  isAvailable: boolean;
  isFeatured: boolean;
  isActive: boolean;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: [true, "Food item name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Food image is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: [true, "Category is required"],
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

menuItemSchema.index({ category: 1, isActive: 1 });
menuItemSchema.index({ foodType: 1, isActive: 1 });

export const MenuItem = mongoose.model<IMenuItem>("MenuItem", menuItemSchema);
