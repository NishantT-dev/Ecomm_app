import express from "express";
import { createUser } from "../controller/createUserController.js";
import { loginUser } from "../controller/loginUserController.js";
import {
  userValidationRules,
  validate,
} from "../validators/validationMiddleware.js";
import { userAuthentication } from "../middleware/authMiddleware.js";
import { updateUser } from "../controller/updateUserController.js";
const router = express.Router();
router.post("/user", userValidationRules, validate, createUser); // new user create karna
router.post("/loginUser", loginUser); // user login karvana
router.patch("/user", userAuthentication, validate, updateUser); // user info update karna
export default router;
