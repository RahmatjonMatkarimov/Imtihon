import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomErrorHandler from "../error/custom-error-handler.ts";

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.AccessToken;

        if (!token) {
            throw CustomErrorHandler.NotFound("Token not found");
        }

        const decoded = jwt.verify(token, process.env.ACCES_TOKEN as string) as any;
        req.user = decoded;

        next();
    } catch (error: any) {
        next(error);
    }
};

export default auth;
