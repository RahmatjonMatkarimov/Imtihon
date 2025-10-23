const Joi = require("joi");

const carValidation = Joi.object({
    brand: Joi.string().trim().min(2).max(50).required(),
    model: Joi.string().trim().min(1).max(50).required(),
    year: Joi.number().integer().min(1900).required(),
    motor: Joi.string().trim().min(1).max(20).required(),
    color: Joi.string().trim().min(3).max(30).required(),
    distance: Joi.number().integer().min(0).required(),
    gearbox: Joi.string().required(),
    price: Joi.number().min(0).required(),
    frontImage: Joi.string().trim().required(),
    backImage: Joi.string().trim().required(),
    modelImage: Joi.string().trim().required(),
    description: Joi.string().trim().min(10).max(1000).required(),
    owner_id: Joi.string().trim().required(),
    category_id: Joi.string().required()
});

module.exports = carValidation;
