import { StatusCodes } from "http-status-codes";
import { IUser } from "../modules/user/user.interface";
import { Request, Response, NextFunction, RequestHandler } from "express";

import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization)
    return next({ code: StatusCodes.UNAUTHORIZED });

  const token = req.headers.authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;

    req.user = payload as IUser;

    return next();
  } catch (error) {
    return next({ code: StatusCodes.UNAUTHORIZED });
  }
}

export { isAuthenticated };
