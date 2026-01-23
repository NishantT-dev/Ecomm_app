import { productModel } from "../model/productModel.js";
export const createProduct = async (req, res) => {
  const seller_Id = req.user.userId;
  const {  product_Id,
    productName,
    prodPrice} = req.body;

  const newProduct = new productModel({
    product_Id,seller_Id,
    productName,
    prodPrice,
    seller_Id,
  });
  await newProduct.save();
  return res.status(201).json({
    success: true,
    message: "New product created successfully",
  });
};
