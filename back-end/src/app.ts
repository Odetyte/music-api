import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

// Create a new express application instance
const app = express();

// Call middelwares
app.use(cors());
app.use(bodyParser.json());

export default app;
