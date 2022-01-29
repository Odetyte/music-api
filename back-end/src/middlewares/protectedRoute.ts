import * as jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

export interface TokenInterface {
  user: {
    userId: number;
  };
}
export function protectedRoute(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let token = request.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error: any, decoded: TokenInterface) => {
        if (error) {
          return response.json({
            success: false,
            message: "Token is not valid",
          });
        } else {
          request.body.decoded = decoded;
          next();
        }
      }
    );
  } else {
    return response.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
}
