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

    deliveryOptions: [
      {
        type: String,
        enum: ["Pickup", "Delivery"],
      },
    ],
    socialMediaLinks: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Seller = models.Seller || model("Seller", SellerSchema);
export default Seller;
