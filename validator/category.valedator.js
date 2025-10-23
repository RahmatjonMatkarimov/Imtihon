const Joi = require("joi");

const categoryValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2),
        img: Joi.string().required().min(6),
        owner_id: Joi.string().required().min(5),
    });

    return schema.validate(data);
};

module.exports = categoryValidator;