import { authSvc } from "./auth.service";
import { Router, Request, Response, NextFunction } from "express";
import { IBaseUser } from "modules/user/user.interface";
import { authValidators } from "./auth.validators";
import { isAuthenticated } from "../../middleware/is-authenticated";

const router = Router();

router.post(
  "/login",
  authValidators.login,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const response = await authSvc.login(email, password);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/signup",
  authValidators.signup,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: Omit<IBaseUser, "id"> = req.body;
      console.log("From the route", user);

      const response = await authSvc.signup(user);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/verify/:hash",
  isAuthenticated,
  async (req: Request<{ hash: string }>, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const hash = req.params.hash;

      const response = await authSvc.verify(userId, hash);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

export { router };
