import morgan from "morgan";
import cors from "cors";
import routes from "../routes";
import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
  json,
  urlencoded,
} from "express";

import { getReasonPhrase } from "http-status-codes";

const app: Express = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("common"));

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
});

app.use("/api", routes);

const errorhandler: ErrorRequestHandler = function (err, req, res, next) {
  const code = err.code || 500;
  const message = err.error || getReasonPhrase(code);
  return res.status(code).send({ message });
};

app.use(errorhandler);

export default app;
