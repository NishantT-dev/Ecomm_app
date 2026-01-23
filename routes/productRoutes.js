import express from "express";
import { createProduct } from "../controller/createProductController.js";
import { userAuthentication } from "../middleware/authMiddleware.js";
import { isAdminSeller } from "../middleware/adminSellerMidlwr.js";

const router = express.Router();

router.post("/product",userAuthentication, isAdminSeller, createProduct);  // new product banana
// only admin and seller can create products

export default router;
