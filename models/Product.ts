import { Schema, Types, model, models } from "mongoose";
const ProductSchema = new Schema(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
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
      default: 1,
    },
    school: {
      type: Types.ObjectId,
      ref: "School",
      required: true,
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
    status: {
      type: String,
      default: "published",
      enum: ["published", "unpublished", "suspended"],
    },

    variants: {
      type: [
        {
          options: {
            type: Object,
          },
          price: {
            type: Number,
          },
          active: {
            type: Boolean,
          },
          stock: {
            type: Number,
            default: 1,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
