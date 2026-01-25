import express from "express";
import guestMiddleware from "../middleware/guestMiddleware.js";
import { userAuthentication } from "../middleware/authMiddleware.js";
import { createOrUpdateCart } from "../controller/createCart.js";
import {getCart} from "../controller/getCart.js"
import { checkout } from "../controller/checkoutController.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
const router=express.Router();

router.post(
  "/cart",optionalAuth,
  guestMiddleware, // detect guest
  createOrUpdateCart,
);
router.post(
  "/checkout",
  userAuthentication, // 👈 mandatory
  checkout,
);
router.get("/cart", guestMiddleware, userAuthentication, getCart);
export default router;