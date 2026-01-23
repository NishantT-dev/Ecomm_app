import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    items: [
      {
        product_Id: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: [1, "Minimum quantity is 1"],
          default: 1,
        },
      },
    ],

    totalBill: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const CartModel = mongoose.model("Cart", cartSchema);
