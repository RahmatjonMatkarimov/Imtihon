const CustomErrorHandler = require("../error/custom-error-handler")
const categoryValidator = require("../validator/category.valedator")

module.exports = (req, res, next) => {
    try {
        const { error } = categoryValidator(req.body)

        if (error) {
            throw CustomErrorHandler.BadRequest(error.message)
        }
        next()
    } catch (error) {
        next(error)
    }
}