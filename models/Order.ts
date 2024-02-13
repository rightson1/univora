import { Schema, model, Types, models } from "mongoose";

const OrderSchema = new Schema(
  {
    //main
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    customerName: String,
    customerPhone: String,
    message: String,
    //product
    variant: {
      type: {
        options: String,
        price: Number,
        active: Boolean,
      },
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    //price
    productPrice: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    otherPayments: {
      type: [
        {
          name: String,
          amount: Number,
        },
      ],
      default: [],
    },
    totalAmount: {
      type: Number,
      required: true,
    },

    //status
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    fulfillmentStatus: {
      type: String,
      enum: ["pending", "confirmed", "completed"],
      default: "pending",
    },

    //payment
    paymentMethod: {
      type: String,
      default: "cash",
    },
    //order type

    orderType: {
      type: String,
      enum: ["customer", "seller"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
