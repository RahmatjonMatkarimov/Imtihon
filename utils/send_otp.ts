import nodemailer from "nodemailer";
import logger from "./logger.ts";
import { config } from "dotenv";
config()

const sendOtp = async (email: string, otp: string | number): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY,
        pass: process.env.APP_PASS as string,
      },
    });

    await transporter.sendMail({
      from: process.env.COMPANY,
      to: email,
      subject: "devBook tasdiqlash kodi",
      text: `tasdiqlash kodi: ${otp}`,
      html: `<b>tasdiqlash code - ${otp}</b>`,
    });

    logger.info(`Sent OTP email: ${email}, verify code: ${otp}`);
  } catch (err) {
    logger.error(`OTP error: ${err}`);
    throw err;
  }
};

export default sendOtp;