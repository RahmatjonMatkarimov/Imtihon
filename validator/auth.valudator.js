const Joi = require("joi");

const authValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required(),
        role: Joi.string().valid("user", "admin").default("user").optional(),
        isVerified: Joi.boolean().default(false).optional(),
    });

    return schema.validate(data);
};

module.exports = authValidator;