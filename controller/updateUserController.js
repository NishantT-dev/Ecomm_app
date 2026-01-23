import { userModel } from "../model/userModel.js";
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;
    if (updates.password) {
      delete updates.password;
    }

// {  "product_Id": "3439799",
//   "productName": "lunch01",
//   "prodDesc": "lunch001 desc",
//   "prodPrice": "999"
// }


    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true },
      )
      .select("-password");
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

