const { Router } = require("express");
const { register, verify, login, logout, resetPassword, GetUser } = require("../controller/auth.controller");
const refreshToken = require("../middleware/refreshToken");
const authValidatorMiddleware = require("../middleware/auth.validator.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = Router()

authRouter.post("/register", authValidatorMiddleware, register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.get("/logOut", authMiddleware, logout)
authRouter.post("/resetPassword", authMiddleware, resetPassword)
authRouter.get("/refreshToken", refreshToken)
authRouter.get("/user", authMiddleware, GetUser)


module.exports = authRouter