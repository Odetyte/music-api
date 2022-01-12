import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import { Request, Response } from "express";
import routes from "./routes/index";

createConnection()
  .then(async (connection) => {
    let port = 3001;

    // import routes
    app.use("/", routes);

    // message to se if our Server is up and running
    app.listen(port);
    console.log(
      `Hello:) Server has started on port ${port}. 🎸 Let's make some jamming music!🎼`
    );

    // check if it connects to frontend
    app.get("/api", (request: Request, response: Response) => {
      response.json({ message: "Hello from server of music jam!" });
    });
  })
  .catch((error) => console.log(error));
