import { Router } from "express";
import {
    register,
    verify,
    login,
    logout,
    resetPassword,
    profile
} from "../controller/auth.controller.ts";
import auth from "../middleware/auth.middleware.ts";
import refreshTokenMiddleware from "../middleware/refreshToken.ts";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/logout",auth, logout);
authRouter.post("/reset-password", auth, resetPassword);
authRouter.get("/refresh-token", auth, refreshTokenMiddleware);
authRouter.get("/profile", auth, profile);