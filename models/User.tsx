import { Schema, model, models } from "mongoose";

const User = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", User);
