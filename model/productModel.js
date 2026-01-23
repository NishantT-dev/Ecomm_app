import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller_Id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
 product_Id: {
    type:String,
    required: true,
  },
    productName: {
      type: String,
      required: [true, "Product name is required"],
    },

    prodDesc: {
      type: String,
    },

    prodPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("Product", productSchema);
