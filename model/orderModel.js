import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product_Id: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["PLACED", "PAID", "SHIPPED", "DELIVERED"],
      default: "PLACED",
    },
  },
  { timestamps: true },
);

export const OrderModel = mongoose.model("Order", orderSchema);
