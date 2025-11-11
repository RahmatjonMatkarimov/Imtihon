import type { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../error/custom-error-handler.ts";
import { accessToken } from "../utils/generator_token.ts";
import jwt from "jsonwebtoken";

const refreshTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.RefreshToken;

        if (!token) {
            throw CustomErrorHandler.NotFound("Token not found");
        }

        const decoded = jwt.verify(token, process.env.ACCES_TOKEN as string) as jwt.JwtPayload;
        (req as any).user = decoded;

        const payload = {
            username: ((req as any).user as any).username,
            id: ((req as any).user as any)._id,
            role: ((req as any).user as any).role,
        };

        const acces = accessToken(payload);

        res.cookie("AccessToken", acces, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });

        next();
    } catch (error: any) {
        next(error);
    }
};

export default refreshTokenMiddleware;
