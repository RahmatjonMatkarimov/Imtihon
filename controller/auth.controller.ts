import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import logger from "../utils/logger.ts";
import randomNum from "../utils/randomNum.ts";
import { accessToken, refreshToken } from "../utils/generator_token.ts";
import CustomErrorHandler from "../error/custom-error-handler.ts";
import { users } from "../model/association.ts";
import type { CreateUserDTO } from "../dto/auth.dto.ts";

users.sync({ force: false })

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, username } = req.body;

        const foundedUser = await users.findOne({ where: { email } });
        if (foundedUser) {
            throw CustomErrorHandler.BadRequest("such user already exists");
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const otpTime = Date.now() + 120000;

        const data = {
            email,
            username,
            password: hashPassword,
            otp: randomNum(6),
            otpTime,
        };

        await users.create(data) as CreateUserDTO;
        logger.info("registered: " + JSON.stringify(data));

        res.status(200).json({
            message: "registered",
            user: {
                email,
                otp: data.otp,
                otpTime: data.otpTime,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;
        const foundedUser = await users.findOne({ where: { email } });

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found");
        }

        const time = Date.now();

        if (foundedUser.otpTime && foundedUser.otpTime < time) {
            throw CustomErrorHandler.BadRequest("otp expired");
        }

        if (foundedUser.otp !== otp) {
            throw CustomErrorHandler.BadRequest("wrong otp");
        }

        await users.update(
            { isVerified: true, otp: null, otpTime: null },
            { where: { id: foundedUser.id } }
        );

        logger.info("verify success ----- " + email);

        res.status(201).json({
            message: "verified successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const foundedUser = await users.findOne({ where: { email } });

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found");
        }

        const decode = await bcrypt.compare(password, foundedUser.password);

        if (!decode) {
            throw CustomErrorHandler.BadRequest("wrong password");
        }

        if (!foundedUser.isVerified) {
            throw CustomErrorHandler.UnAuthorized("not verified");
        }

        const payload = {
            username: foundedUser.username,
            id: foundedUser.id,
            role: foundedUser.role,
        };

        const access = accessToken(payload);
        const refresh = refreshToken(payload);

        res.cookie("AccessToken", access, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });
        res.cookie("RefreshToken", refresh, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
        });

        logger.info("login success ------ " + email);

        res.status(201).json({
            message: "success",
            access,
        });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("AccessToken");
        res.clearCookie("RefreshToken");

        res.status(201).json({
            message: "logged out",
        });
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const foundedUser = await users.findOne({ where: { email } });

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found");
        }

        if (!foundedUser.isVerified) {
            throw CustomErrorHandler.UnAuthorized("not verified");
        }

        const hashPassword = await bcrypt.hash(password, 12);
        await users.update(
            { password: hashPassword },
            { where: { id: foundedUser.id } }
        );

        logger.info("reset password success ------- " + email);

        res.status(201).json({
            message: "reset password success",
        });
    } catch (err) {
        next(err);
    }
};
export const profile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?._id;
        const foundedUser = await users.findOne({ where: { id } });

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found");
        }

        res.status(201).json({
            message: "success",
            data: foundedUser
        });
    } catch (err) {
        next(err);
    }
};
