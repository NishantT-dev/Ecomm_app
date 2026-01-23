import express from "express";
import { userAuthentication } from "../middleware/authMiddleware.js";
import { createOrUpdateCart } from "../controller/createCart.js";
import { getCart } from "../controller/getCart.js";

const router=express.Router();
router.post("/cart",userAuthentication,createOrUpdateCart); // new cart creation
router.get("/cart",userAuthentication,getCart); // get Cart details 
export default router;
