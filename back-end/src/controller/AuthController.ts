import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";

export default class AuthController {
  static login = async (request: Request, response: Response) => {
    //Check if username and password are set
    let { email, password } = request.body;

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email, password } });
    } catch (error) {
      response.status(401).send("Email or password is incorrect");
    }

    const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    response.header("auth-token", token).send(token);
  };
}
