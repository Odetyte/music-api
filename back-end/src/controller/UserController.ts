import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { JamSession } from "../entity/JamSession";

export default class UserController {
  static listAll = async (request: Request, response: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({ relations: ["jamSessions"] });
    response.json(users);
  };

  static newUser = async (request: Request, response: Response) => {
    let { username, email, bandRole, password } = request.body;

    let user = new User();
    user.username = username;
    user.email = email;
    user.bandRole = bandRole;
    user.password = password;

    const userRepository = getRepository(User);

    // check if the user already in the database
    const emailExist = await userRepository.findOne({ email: email });

    if (emailExist)
      return response.status(400).send("User with such email already exsits.");

    try {
      const results = await userRepository.save(user);
      return response.send({
        userId: user.id,
        username: user.username,
        bandRole: user.bandRole,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static createJamSession = async (request: Request, response: Response) => {
    const id = request.params;

    //Get the user from database
    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    let { title, bandRoleParticipants, location } = request.body;
    let jamSession = new JamSession();
    jamSession.title = title;
    jamSession.location = location;
    jamSession.bandRoleParticipants = bandRoleParticipants;
    jamSession.host = user;

    const jamRepository = getRepository(JamSession);

    try {
      const results = await jamRepository.save(jamSession);
      return response.send(results);
    } catch (error) {
      response.status(400).send("Something went wrong");
    }
  };
}
