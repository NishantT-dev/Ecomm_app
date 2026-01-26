import { CartModel } from "../model/cartModel.js";
import { OrderModel } from "../model/orderModel.js";
import { productModel } from "../model/productModel.js";

export const checkout = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 1️⃣ Find cart
    const cart = await CartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }
console.log(userId);
    // 2️⃣ Recalculate total (security)
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await productModel.findById(item.product_Id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found during checkout",
        });
      }
      totalAmount += product.prodPrice * item.quantity;
    }

    // 3️⃣ Create order
    const order = new OrderModel({
      userId,
      items: cart.items,
      totalAmount,
      status: "PLACED",
    });

    await order.save();

    // 4️⃣ Clear cart
    cart.items = [];
    cart.totalBill = 0;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
