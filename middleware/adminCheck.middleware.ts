import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomErrorHandler from "../error/custom-error-handler.ts";

declare module "express-serve-static-core" {
    interface Request {
        user?: jwt.JwtPayload | { username: string; _id: string; role: string };
    }
}

const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.AccessToken;

        if (!token) {
            throw CustomErrorHandler.NotFound("Token not found");
        }

        const decoded = jwt.verify(token, process.env.ACCES_TOKEN as string) as any;
        req.user = decoded;

        if (typeof req.user === "object" && req.user.role !== "admin") {
            throw CustomErrorHandler.BadRequest("You are not admin");
        }

        next();
    } catch (error: any) {
        next(error);
    }
};

export default adminAuth;