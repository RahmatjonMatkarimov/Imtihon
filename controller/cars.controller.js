const CustomErrorHandler = require("../error/custom-error-handler");
const carsSchema = require("../schema/cars.schema");

const PostCar = async (req, res, next) => {
    try {
        const { brand, model, year, motor, color, distance, gearbox, price, description, owner_id, category_id } = req.body
        const { frontImage, backImage, modelImage } = req.files
        console.log(req.files);


        await carsSchema.create({
            brand,
            model,
            year,
            motor,
            color,
            distance,
            gearbox,
            price,
            frontImage: frontImage[0].filename,
            backImage: backImage[0].filename,
            modelImage: modelImage[0].filename,
            description,
            owner_id,
            category_id
        });

        res.status(201).json({
            message: "Careated"
        })

    } catch (err) {
        next(err)
    }
};

const GetCars = async (req, res, next) => {
    try {
        const cars = await carsSchema.find()

        res.status(200).json(
            cars
        )
    } catch (err) {
        next(err)
    }
};

const GetOneCar = async (req, res, next) => {
    try {
        const { id } = req.params
        const car = await carsSchema.findById(id)

        if (!car) {
            throw CustomErrorHandler.NotFound("Car not found")
        }

        return res.status(200).json({
            message: "Car retrieved successfully"
        })

    } catch (err) {
        next(err)
    }
};

const PutCar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { brand, model, year, motor, color, distance, gearbox, price, description, owner_id } = req.body
        const { frontImage, backImage, modelImage } = req.files

        const updateData = { brand, model, year, motor, color, distance, gearbox, price, description, owner_id }

        if (frontImage) {
            updateData.frontImage = frontImage.path
        }

        if (backImage) {
            updateData.backImage = backImage.path
        }

        if (modelImage) {
            updateData.modelImage = modelImage.path
        }

        const car = await carsSchema.findByIdAndUpdate(id, updateData)

        if (!car) {
            throw CustomErrorHandler.NotFound("Car not found")
        }

        res.status(200).json({
            message: "Car updated"
        })

    } catch (err) {
        next(err)
    }
}

const DeleteCar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const car = await carsSchema.findByIdAndDelete(id);

        if (!car) {
            throw CustomErrorHandler.NotFound("Car not found")
        }

        res.status(200).json({
            message: "Car deleted"
        })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    PostCar,
    GetCars,
    GetOneCar,
    PutCar,
    DeleteCar
};