import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    slug: {
      type: String,
      slug: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    keywords: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortingPriority: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
// CategorySchema.index({ name: "text", keywords: "text" });
const Category = models.Category || model("Category", CategorySchema);
export default Category;
