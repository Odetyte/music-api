import { Router } from "express";
import { createValidator } from "express-joi-validation";
import AuthController from "../controller/AuthController";
import UserController from "../controller/UserController";
import { registerUser, logInUser } from "../validation/user";

const router = Router();
const validator = createValidator();

router.post(
  "/register",
  [validator.body(registerUser)],
  UserController.newUser
);
router.post("/login", [validator.body(logInUser)], AuthController.login);

export default router;
