import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // latest stable version
});

export default stripe;
