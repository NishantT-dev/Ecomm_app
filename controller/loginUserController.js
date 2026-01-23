import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { userModel } from "../model/userModel.js";
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SEC,
      { expiresIn: "15m" },
    );
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({
      success: true,
      message:" User succesfully logged In",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
