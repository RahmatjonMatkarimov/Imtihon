import type { ErrorRequestHandler, NextFunction, Request, Response } from "express"

const CustomErrorHandler = require("../error/custom-error-handler")
const logger = require("../utils/logger")

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        if (err instanceof CustomErrorHandler) {
            logger.error(err)
            return res.status(err.status || 400).json({
                message: err.message,
                errors: err.errors
            })
        }

        if (err.name === "ValidationError") {
            const ValidationErrors = Object.values(err.errors).map((item: any) => item.message)
            logger.error(ValidationErrors)
            return res.status(400).json({
                errorName: "ValidationError",
                errors: ValidationErrors
            })
        }

        next()
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export default errorMiddleware