import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    photoURL: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = models.Admin || model("Admin", AdminSchema);
export default Admin;
