import { Router } from "express";
import {
  register,
  verify,
  login,
  logout,
  resetPassword
} from "../controller/auth.controller.ts";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/reset-password", resetPassword);