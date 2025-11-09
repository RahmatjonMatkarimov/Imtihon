import type { NextFunction, Request, Response } from "express"
import CustomErrorHandler from "../error/custom-error-handler.ts"
import logger from "../utils/logger.ts"

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