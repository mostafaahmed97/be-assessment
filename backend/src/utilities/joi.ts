import Joi, { Schema } from "joi";
import { Request, Response, NextFunction, RequestHandler } from "express";

type requestDataPart = "body" | "query" | "params";

function generateValidationMiddleware(
  schema: Schema,
  part: requestDataPart = "body"
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const reqPart = part;

    const data = req[reqPart];
    const { value, error } = schema.validate(data);

    if (error) {
      const errorMsgs = error.details.map((detail) => detail.message);

      return next({
        code: 400,
        error: errorMsgs,
      });
    }

    req[reqPart] = { ...req[reqPart], ...value };
    return next();
  };
}

export { generateValidationMiddleware };
