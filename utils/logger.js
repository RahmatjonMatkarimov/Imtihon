const { createLogger, transports, format } = require("winston")
const { simple, combine } = format
require("winston-mongodb")
require("dotenv").config()

module.exports = createLogger({
    level: "debug",
    format: combine(simple()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "log/combined.log" }),
        new transports.MongoDB({ db: process.env.MONGO_URI })
    ] 
})