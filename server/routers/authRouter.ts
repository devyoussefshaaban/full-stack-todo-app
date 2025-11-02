import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController";
import { auth } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", auth, getMe);

export default authRouter;
