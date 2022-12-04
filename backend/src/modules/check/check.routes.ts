import { checkValidators } from "./check.validators";

import { Router, Request, Response, NextFunction } from "express";
import { IBaseCheck } from "./check.entity";
import { checkSvc } from "./check.service";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  return res.send("Aaa");
});

router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    if (!req.params.id) throw { code: 400 };
    return res.send("Aaa");
  }
);

router.post(
  "/",
  checkValidators.create,
  async (req: Request, res: Response, next: NextFunction) => {
    const data: IBaseCheck = req.body;
    const userId = req.user.id;
    const response = await checkSvc.create(data, userId);

    return res.send(req.body);
  }
);

router.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.send("Aaa");
  }
);

router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    return res.send("Aaa");
  }
);

export { router };
