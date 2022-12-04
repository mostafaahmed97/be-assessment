import { checkValidators } from "./check.validators";

import { Router, Request, Response, NextFunction } from "express";
import { IBaseCheck } from "./check.entity";
import { checkSvc } from "./check.service";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await checkSvc.get(req.user.id);
    console.log("All the checks for user", response);
    return res.send(response);
  } catch (error) {
    return next(error);
  }
});

router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw { code: 400 };
      const response = await checkSvc.getOne(req.user.id, req.params.id);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/",
  checkValidators.create,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IBaseCheck = req.body;
      const userId = req.user.id;
      const response = await checkSvc.create(data, userId);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.patch(
  "/:id",
  checkValidators.create,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const checkId = req.params.id;
      const payload: IBaseCheck = req.body;
      const response = await checkSvc.update(userId, checkId, payload);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const checkId = req.params.id;

      await checkSvc.delete(userId, checkId);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
);

export { router };
