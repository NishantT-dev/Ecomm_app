
import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index:true,
      sparse: true, // allows multiple docs without userId
    },
    guestId: {
      type: String,
      unique: true,
      sparse: true, // allows multiple docs without guestId
    },
    items: [
      {
        product_Id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    totalBill: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const CartModel = mongoose.model("Cart", cartSchema);
