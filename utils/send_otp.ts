import nodemailer from "nodemailer";
import logger from "./logger.ts";

const sendOtp = async (email: string, otp: string | number): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rahmatjon974@gmail.com",
        pass: process.env.APP_PASS as string,
      },
    });

    await transporter.sendMail({
      from: "rahmatjon974@gmail.com",
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