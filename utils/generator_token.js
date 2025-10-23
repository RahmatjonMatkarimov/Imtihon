const jwt = require("jsonwebtoken")
const logger = require("./logger")

const accessToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.ACCES_TOKEN, { expiresIn: "15m" })
    } catch (err) {
        logger.error(`accesToken error ------ ${err}`)
        throw new Error(err)
    }
}

const refreshToken = async (payload) => {
    try {
        return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "15d" })
    } catch (err) {
        logger.error(`refreshToken error ------ ${err}`)
        throw new Error(err)
    }
}

module.exports = {
    accessToken,
    refreshToken
}