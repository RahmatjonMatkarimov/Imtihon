const authSchema = require("../schema/auth.schema")
const bcrypt = require("bcryptjs")
const logger = require("../utils/logger")
const randomNum = require("../utils/randomNum")
const { accessToken, refreshToken } = require("../utils/generator_token")
const CustomErrorHandler = require("../error/custom-error-handler")

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const foundedUser = await authSchema.find({ email })

        if (foundedUser.length) {
            throw CustomErrorHandler.BadRequest("such user already exists")
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const otpTime = Date.now() + 120000

        const data = {
            email,
            password: hashPassword,
            otp: randomNum(6),
            otpTime
        }

        logger.info("registered " + JSON.stringify(data))
        await authSchema.create(data)

        res.status(200).json({
            message: "registered",
            user: {
                email,
                otp: data.otp,
                otpTime: data.otpTime
            }
        })

    } catch (error) {
        next(error)
    }
}
const verify = async (req, res, next) => {
    try {
        const {
            email,
            otp
        } = req.body

        const foundedUser = await authSchema.findOne({ email })
        const time = Date.now()

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found")
        }

        if (foundedUser.otpTime < time) {
            throw CustomErrorHandler.BadRequest("otp expired")
        }

        if (foundedUser.otp !== otp) {
            throw CustomErrorHandler.BadRequest("wrong otp")

        } else if (foundedUser.otp === otp) {
            await authSchema.findByIdAndUpdate(foundedUser._id, { isVerified: true, otp: null, otpTime: null })
            logger.info("verify succuess ----- " + email)
            res.status(201).json({
                massage: "verify"
            })
        }

    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body

        const foundedUser = await authSchema.findOne({ email })

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found")
        }

        const decode = await bcrypt.compare(password, foundedUser.password)

        if (decode) {
            if (foundedUser.isVerified) {
                const payload = {
                    username: foundedUser.username,
                    id: foundedUser._id,
                    role: foundedUser.role,
                }

                const access = accessToken(payload)
                const refresh = refreshToken(payload)
                res.cookie("AccessToken", access, { httpOnly: true, maxAge: 15 * 60 * 1000 })
                res.cookie("RefreshToken", refresh, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 })
                res.status(201).json({
                    massage: "seccess",
                    access
                })
                logger.info("login succuess ------ " + email)
            } {
                throw CustomErrorHandler.UnAuthoried("not verified")

            }

        } else {
            throw CustomErrorHandler.BadRequest("wrong password")

        }
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie("AccessToken")
        res.clearCookie("RefreshToken")

        res.status(201).json({
            message: "log out"
        })
    } catch (err) {
        next(err)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { password, email } = req.body
        const foundedUser = await authSchema.findOne({ email })

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found")
        }

        if (foundedUser.isVerified) {
            const hashPassword = await bcrypt.hash(password, 12)
            await authSchema.findByIdAndUpdate(foundedUser._id, {
                password: hashPassword,
            })
            res.status(201).json({
                message: "reset password succuess"
            })
            logger.info("reset password succuess ------- " + email)
        } {
            throw CustomErrorHandler.UnAuthoried("not verified")
        }
    } catch (err) {
        next(err)
    }
}

const GetUser = async (req, res, next) => {
    try {
        const foundedUser = await authSchema.findById(req.user.id)

        if (!foundedUser) {
            throw CustomErrorHandler.NotFound("user not found")
        }

        res.status(200).json(foundedUser)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    verify,
    login,
    logout,
    resetPassword,
    GetUser
}