import { Router } from "express";
import JamSessionController from "../controller/JamSessionController";
import { protectedRoute } from "../middlewares/protectedRoute";

const router = Router();

router.get("/jam-sessions", [protectedRoute], JamSessionController.listAll);

export default router;
