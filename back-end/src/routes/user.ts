import { Router } from "express";
import { createValidator } from "express-joi-validation";
import UserController from "../controller/UserController";
import { protectedRoute } from "../middlewares/protectedRoute";

const router = Router();

router.get("/users", [protectedRoute], UserController.listAll);
router.post(
  "/users/:id/jam-sessions",
  [protectedRoute],
  UserController.createJamSession
);

export default router;
