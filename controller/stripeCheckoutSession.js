import Stripe from "stripe";
import dotenv from "dotenv";
import { CartModel } from "../model/cartModel.js";
import { productModel } from "../model/productModel.js";

dotenv.config();

// Stripe instance (connects your backend to Stripe account)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    // userId for logged-in users, guestId for guest users
    const { userId, guestId } = req.body;

    // 1️⃣ Fetch cart from DB
    const cart = await CartModel.findOne({
      $or: [{ userId }, { guestId }],
    }).populate("items.product_Id");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Convert cart items into Stripe line items
    const line_items = cart.items.map((item) => {
      const product = item.product_Id;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productName,
            description: product.prodDesc,
          },
          // Stripe takes amount in cents
          unit_amount: product.prodPrice * 100,
        },
        quantity: item.quantity,
      };
    });

    // 3️⃣ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      success_url: `${process.env.S_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.C_DOMAIN}/cancel`,
    });

    // 4️⃣ Send Stripe payment URL to frontend
    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
