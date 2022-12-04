import { IBaseUser } from "modules/user/user.interface";
import { Router, Request, Response, NextFunction } from "express";
import { userSvc } from "./user.service";

const router = Router();

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userSvc.me(req.user.id);
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

export { router };
