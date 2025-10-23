const CustomErrorHandler = require("../error/custom-error-handler");
const categorySchema = require("../schema/category.schema");

const PostCategory = async (req, res, next) => {
    try {
        const { name, owner_id } = req.body

        await categorySchema.create({
            name,
            img: req.file.filename,
            owner_id,
        })

        res.status(201).json({
            message: "Category created"
        })

    } catch (err) {
        next(err)
    }
};

const GetCategory = async (req, res, next) => {
    try {
        const categories = await categorySchema.find().populate("Cars")

        res.status(200).json({
            categories
        })

    } catch (err) {
        next(err)
    }
};

const GetOneCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await categorySchema.findById(id).populate("cars")

        if (!category) {
            throw CustomErrorHandler.NotFound("category not found")
        }

        res.status(200).json({
            data: category
        })

    } catch (err) {
        next(err)
    }
};

const PutCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, img } = req.body

        const category = await categorySchema.findByIdAndUpdate(id, { name, img })

        if (!category) {
            throw CustomErrorHandler.NotFound("category not found")
        }

        res.status(200).json({
            message: "Category updated"
        });

    } catch (err) {
        next(err);
    }
};

const DeleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const category = await categorySchema.findByIdAndDelete(id)

        if (!category) {
            throw CustomErrorHandler.NotFound("category not found")
        }

        res.status(200).json({
            message: "Category deleted"
        })

    } catch (err) {
        next(err);
    }
};

module.exports = {
    PostCategory,
    GetCategory,
    GetOneCategory,
    PutCategory,
    DeleteCategory
};