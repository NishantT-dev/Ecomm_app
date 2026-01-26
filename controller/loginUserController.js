import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { userModel } from "../model/userModel.js";
import { CartModel } from "../model/cartModel.js";
import { productModel } from "../model/productModel.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2️⃣ Validate password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SEC,
      { expiresIn: "15m" },
    );

    const guestId = req.headers["x-guest-id"];

    if (guestId) {
      const guestCart = await CartModel.findOne({ guestId });

      if (guestCart) {
        let userCart = await CartModel.findOne({ userId: user._id });

        // Case 1: user has no cart
        if (!userCart) {
          guestCart.userId = user._id;
          guestCart.guestId = null;
          await guestCart.save();
        } else {
          // Case 2: merge carts
          for (const gItem of guestCart.items) {
            const index = userCart.items.findIndex(
              (uItem) =>
                uItem.product_Id.toString() === gItem.product_Id.toString(),
            );
            if (index > -1) {
              userCart.items[index].quantity += gItem.quantity;
            } else {
              userCart.items.push(gItem);
            }
          }

          // Recalculate total
          userCart.totalBill = 0;
          for (const item of userCart.items) {
            const product = await productModel.findById(item.product_Id);
            userCart.totalBill += product.prodPrice * item.quantity;
          }

          await userCart.save();
          await CartModel.deleteOne({ guestId });
        }
      }
    }

    // 5️⃣ Send response
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({
      success: true,
      message: "User successfully logged in",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
