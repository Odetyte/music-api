import * as jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export function protectedRoute(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.header("auth-token");
  if (!token) return response.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    request.body.user = verified;
    next();
  } catch (error) {
    response.status(400).send("Invalid Token");
  }
}
