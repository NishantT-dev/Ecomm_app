import { productModel } from "../model/productModel.js";
import { CartModel } from "../model/cartModel.js";
export const createOrUpdateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { product_Id, quantity = 1 } = req.body.items[0];
    const product = await productModel.findById(product_Id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ product_Id, quantity }],
        totalBill: product.prodPrice * quantity
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product_Id.toString() === product_Id
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product_Id, quantity });
      }
      cart.totalBill = 0;
      for (const item of cart.items) {
        const prod = await productModel.findById(item.product_Id);
        cart.totalBill += prod.prodPrice * item.quantity;
      }
    }
    await cart.save();
    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    }); } };