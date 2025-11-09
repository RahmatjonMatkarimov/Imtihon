import jwt from "jsonwebtoken";
import logger from "./logger.ts";

interface JwtPayload {
  [key: string]: any;
}

export const accessToken = (payload: JwtPayload): string => {
  try {
    const secret = process.env.ACCES_TOKEN as string;
    if (!secret) throw new Error("ACCESS_TOKEN secret not defined");

    return jwt.sign(payload, secret, { expiresIn: "15m" });
  } catch (err) {
    logger.error(`accessToken error ------ ${err}`);
    throw err;
  }
};

export const refreshToken = (payload: JwtPayload): string => {
  try {
    const secret = process.env.REFRESH_TOKEN as string;
    if (!secret) throw new Error("REFRESH_TOKEN secret not defined");

    return jwt.sign(payload, secret, { expiresIn: "15d" });
  } catch (err) {
    logger.error(`refreshToken error ------ ${err}`);
    throw err;
  }
};
