import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";

export default class AuthController {
  static login = async (request: Request, response: Response) => {
    //Check if username and password are set
    try {
      let { email, password } = request.body;

      //Get user from database
      const userRepository = getRepository(User);
      let user: User;

      // find user in databse
      user = await userRepository.findOneOrFail({ where: { email, password } });

      // check if user exsist
      if (user) {
        // if yes create JWT token which expoires afte 1 hours
        const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
          expiresIn: "1h",
        });
        // send response with an authorization token
        response.status(200).json({ authToken: token });
      }
    } catch (error) {
      response.status(400).send({ message: "Email or password is incorrect" });
    }
  };
}
