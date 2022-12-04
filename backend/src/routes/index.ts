import { Router } from "express";
import { isAuthenticated } from "../middleware/is-authenticated";
import { router as authRoutes } from "../modules/auth/auth.routes";
import { router as userRoutes } from "../modules/user/user.routes";
import { router as checkRoutes } from "../modules/check/check.routes";

const router = Router();

router.use(authRoutes);
router.use("/users", isAuthenticated, userRoutes);
router.use("/checks", isAuthenticated, checkRoutes);

export default router;
