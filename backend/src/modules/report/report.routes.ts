import { reportSvc } from "./report.service";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await reportSvc.get(req.user.id);
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
      const response = await reportSvc.getOne(req.user.id, req.params.id);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

router.get(
  "/tags/:tag",
  async (req: Request<{ tag: string }>, res: Response, next: NextFunction) => {
    try {
      if (!req.params.tag) throw { code: 400 };
      const response = await reportSvc.getByTag(req.user.id, req.params.tag);
      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
);

export { router };
