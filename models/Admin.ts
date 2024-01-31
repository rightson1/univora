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
    photoURL: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = models.Admin || model("Admin", AdminSchema);
export default Admin;
