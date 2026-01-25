import jwt from "jsonwebtoken";

export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ If no token, just move on (guest)
    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user
    next();
  } catch (error) {
    // ❌ Don't block guest users
    return next();
  }
};
