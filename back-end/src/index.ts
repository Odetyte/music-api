import "reflect-metadata";
import { createConnection } from "typeorm";
import { port } from './config';
import app from './app';
import {Request, Response} from "express";
import { User } from "./entity/User";

createConnection().then(async connection => {
  app.listen(port);
  console.log(`Express server has started on port ${port}.`);


  app.get('/api', (request: Request, response: Response) => {
    response.json({ message: 'Hello from server! Pifas' });
  });

  const userRepository = connection.getRepository(User);


   app.get("/users", async(req: Request, res: Response) => {
        const users = await userRepository.find();
        res.json(users);
    });

  app.post("/users", async (req: Request, res: Response) => {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });
}).catch(error => console.log(error));
