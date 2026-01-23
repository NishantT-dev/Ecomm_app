import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel.js";
export const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const newUser = new userModel({ userName, email, password });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SEC,
      { expiresIn: "15m" }
    );
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token,
      user: { id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
