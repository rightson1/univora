import { Schema, Types, model, models } from "mongoose";
const ProductSchema = new Schema(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
      required: true,
    },
    tags: [String],
    brand: String,
    thumbnail: String,
    media: [String],
    active: {
      type: Boolean,
      default: true,
    },
    options: [
      {
        title: {
          type: String,
          required: true,
          unique: true,
        },
        variations: [
          {
            id: String,
            text: String,
          },
        ],
      },
    ],
    variants: [
      {
        options: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
