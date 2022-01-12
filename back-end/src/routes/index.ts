import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import jam from "./jamsession";

const routes = Router();

routes.use("/", auth);
routes.use("/", user);
routes.use("/", jam);

export default routes;
