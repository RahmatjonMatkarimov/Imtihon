const { Router } = require("express")
const { PostCar, PutCar, DeleteCar, GetOneCar, GetCars } = require("../controller/cars.controller")
const upload = require("../utils/file_upload")

const CarsRouter = Router()

CarsRouter.get("/cars", GetCars)
CarsRouter.get("/cars/:id", GetOneCar)
CarsRouter.post("/cars", upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "modelImage", maxCount: 1 },
]), PostCar
)
CarsRouter.put("/cars/:id", upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "modelImage", maxCount: 1 },
]), PutCar
)
CarsRouter.delete("/cars/:id", DeleteCar)

module.exports = CarsRouter
