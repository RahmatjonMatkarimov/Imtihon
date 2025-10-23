const CustomErrorHandler = require("../error/custom-error-handler")
const carValidation = require("../validator/cars.valedator")

module.exports = (req, res, next) => {
    try {
        const { error } = carValidation(req.body)

        if (error) {
            throw CustomErrorHandler.BadRequest(error.message)
        }
        next()
    } catch (error) {
        next(error)
    }
}