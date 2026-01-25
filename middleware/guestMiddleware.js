import { v4 as uuidv4 } from "uuid";

const guestMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Check if user is already logged in
    if (req.user) {
      return next();
    }
    // 2️⃣ Read guest id from headers
    let guestId = req.headers["x-guest-id"];

    // 3️⃣ If guest id does not exist, generate new one
    if (!guestId) {
      guestId = uuidv4();

      // Send guest id back to frontend
      res.setHeader("x-guest-id", guestId);
    }

    // 4️⃣ Attach guest id to request object
    req.guestId = guestId;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Guest middleware error",
    });
  }
};

export default guestMiddleware;
