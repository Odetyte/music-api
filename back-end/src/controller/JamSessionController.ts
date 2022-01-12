import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { JamSession } from "../entity/JamSession";

export default class JamSessionController {
  static listAll = async (request: Request, response: Response) => {
    const jamRepository = getRepository(JamSession);
    const jamSessions = await jamRepository.find({ relations: ["host"] });
    response.json(jamSessions);
  };
}
