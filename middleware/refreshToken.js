const jwt = require("jsonwebtoken")
const { accessToken } = require("../utils/generator_token")
const CustomErrorHandler = require("../error/custom-error-handler")

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.RefreshToken

        if (!token) {
            throw CustomErrorHandler.NotFound("token not found")
        }

        const decode = jwt.verify(token, process.env.ACCES_TOKEN)
        req.user = decode
        const payload = {
            username: req.user.username,
            id: req.user._id,
            role: req.user.role,
        }

        const acces = accessToken(payload)
        res.cookie("AccessToken", acces, { httpOnly: true, maxAge: 15 * 60 * 1000 })
        next()
    } catch (error) {
        next(error)
    }
}