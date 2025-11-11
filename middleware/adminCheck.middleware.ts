import jwt from "jsonwebtoken";
import CustomErrorHandler from "../error/custom-error-handler.ts";
import type { NextFunction, Request, Response } from "express";


const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.AccessToken;

        if (!token) {
            throw CustomErrorHandler.NotFound("Token not found");
        }

        const decoded = jwt.verify(token, process.env.ACCES_TOKEN as string) as any;
        (req as any).user = decoded as string;

        if (typeof (req as any).user === "object" && (req as any).user.role !== "admin") {
            throw CustomErrorHandler.BadRequest("You are not admin");
        }

        next();
    } catch (error: any) {
        next(error);
    }
};

export default adminAuth;