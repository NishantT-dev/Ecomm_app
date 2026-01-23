import { body, validationResult } from "express-validator";
export const userValidationRules = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),


  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Invalid role specified"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  
  return res.status(400).json({
    success: false,
    errors: errors.array().map((err) => err.msg),
  });
};
