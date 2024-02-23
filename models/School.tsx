import { Schema, model, models } from "mongoose";

const SchoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // location: {
    //   type: String,
    //   required: true,
    // },
    subdomain: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const School = models?.School || model("School", SchoolSchema);
export default School;
