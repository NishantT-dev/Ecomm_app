import { productModel } from "../model/productModel.js";
import { CartModel } from "../model/cartModel.js";

export const createOrUpdateCart = async (req, res) => {
  try {
    // 1️⃣ Decide cart owner
    const ownerFilter = req.user
      ? { userId: req.user.userId }
      : { userId: 1, guestId: req.guestId }; // force userId=1 for guests

    const ownerData = req.user
      ? { userId: req.user.userId }
      : { userId: 1, guestId: req.guestId }; // same for new cart creation

    console.log("guestId:", req.guestId, "userId:", req.user?.userId || 1);

    // 2️⃣ Extract product details
    const { product_Id, quantity = 1 } = req.body.items[0];

    if (!product_Id || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product or quantity" });
    }

    // 3️⃣ Validate product
    const product = await productModel.findById(product_Id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // 4️⃣ Find cart
    let cart = await CartModel.findOne(ownerFilter);

    if (!cart) {
      cart = new CartModel({
        ...ownerData,
        items: [{ product_Id, quantity }],
        totalBill: product.prodPrice * quantity,
      });
    } else {
      const itemIndex = cart.items.findIndex((item) =>
        item.product_Id.equals(product_Id),
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product_Id, quantity });
      }

      // Recalculate bill
      await cart.populate("items.product_Id");
      cart.totalBill = cart.items.reduce(
        (acc, item) => acc + item.product_Id.prodPrice * item.quantity,
        0,
      );
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      cart,
      guestId: req.guestId || null,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
