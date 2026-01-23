import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoute.js"
const router = express.Router();

router.use("/api", userRoutes); // newUser, loginUser, updateUser

router.use("/api", productRoutes); //newProduct
router.use("/api",cartRoute);  // createCart
export default router;
