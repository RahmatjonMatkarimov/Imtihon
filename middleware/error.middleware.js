const CustomErrorHandler = require("../error/custom-error-handler")
const logger = require("../utils/logger")

module.exports = (err, req, res, next) => {
    try {
        if (err instanceof CustomErrorHandler) {
            logger.error(err)
            return res.status(err.status || 400).json({
                message: err.message,
                errors: err.errors
            })
        }

        if (err.name === "ValidationError") {
            const ValidationErrors = Object.values(err.errors).map((item) => item.message)
            logger.error(ValidationErrors)
            return res.status(400).json({
                errorName: "ValidationError",
                errors: ValidationErrors
            })
        }

        next()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}