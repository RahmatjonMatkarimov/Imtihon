import { createLogger, transports, format, Logger } from "winston";
import dotenv from "dotenv";
dotenv.config();

const { combine, simple, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger: Logger = createLogger({
  level: "debug",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), simple(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "log/combined.log" }),
  ],
});

export default logger;
