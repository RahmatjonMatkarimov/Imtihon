const { Router } = require("express")
const { PostCar, PutCar, DeleteCar, GetOneCar, GetCars } = require("../controller/cars.controller")
const upload = require("../utils/file_upload")
const adminCheckMiddleware = require("../middleware/adminCheck.middleware")
const authMiddleware = require("../middleware/auth.middleware")
const carsValidatorMiddleware = require("../middleware/cars.validator.middleware")

const CarsRouter = Router()

CarsRouter.get("/cars", authMiddleware,GetCars)
CarsRouter.get("/cars/:id",authMiddleware, GetOneCar)
CarsRouter.post("/cars", upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "modelImage", maxCount: 1 },
]), adminCheckMiddleware,carsValidatorMiddleware, PostCar
)
CarsRouter.put("/cars/:id", upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "modelImage", maxCount: 1 },
]), adminCheckMiddleware, PutCar
)
CarsRouter.delete("/cars/:id", adminCheckMiddleware, DeleteCar)

module.exports = CarsRouter
