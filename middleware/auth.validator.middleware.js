const CustomErrorHandler = require("../error/custom-error-handler")
const logger = require("../utils/logger")
const authValidator = require("../validator/auth.valudator")

module.exports = (req, res, next) => {
    try {
        const { error } = authValidator(req.body)

        if (error) {
            throw CustomErrorHandler.BadRequest(error.message)
        }
        next()
    } catch (error) {
        next(error)
    }
}