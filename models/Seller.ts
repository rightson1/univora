import { Schema, model, models } from "mongoose";

const SellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
      cascade: true,
    },
    description: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    deliveryOptions: [
      {
        type: String,
        enum: ["Pickup", "Delivery"],
        default: "Pickup",
      },
    ],
    socials: {
      type: [
        {
          platform: {
            type: String,
            enum: ["instagram", "tiktok", "whatsapp"],
          },
          link: {
            type: String,
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

const Seller = models.Seller || model("Seller", SellerSchema);
export default Seller;
