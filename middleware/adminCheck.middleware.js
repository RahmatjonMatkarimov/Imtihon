const jwt = require("jsonwebtoken")
const CustomErrorHandler = require("../error/custom-error-handler")

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.AccessToken

        if (!token) {
            throw CustomErrorHandler.NotFound("token not found")
        }

        const decode = jwt.verify(token, process.env.ACCES_TOKEN)
        req.user = decode

        if (req.user.role !== "admin") {
            throw CustomErrorHandler.BadRequest("you are not admin")
        }

        next()
    } catch (error) {
        next(error)
    }
}