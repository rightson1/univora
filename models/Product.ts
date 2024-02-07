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
    },
    tags: [String],
    brand: String,
    thumbnail: {
      type: String,
      required: true,
    },
    media: {
      type: [String],
      default: [],
    },
    // product or service
    productType: {
      type: String,
      default: "product",
      enum: ["product", "service"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    options: [
      {
        title: {
          type: String,
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
        },
        price: {
          type: Number,
        },
        active: {
          type: Boolean,
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
