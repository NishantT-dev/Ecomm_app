import { CartModel } from "../model/cartModel.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await CartModel.findOne({ userId })
      .populate("items.product_Id");
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: null,
      });
    }
    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
