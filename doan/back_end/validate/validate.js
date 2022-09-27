const Joi = require("@hapi/joi");
const { schema } = require("../model/user");

//d=check đăng ký
const registerValidation = (data) => {
    const Schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).max(16).required(),
        address: Joi.string().min(6).required(),
        phone: Joi.string().min(6).required(),
        role: Joi.number().required(),
    });
    return Schema.validate(data);
};
const loginValition = (data) => {
    const Schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).max(16).required(),
    });
    return Schema.validate(data);
};

module.exports = { registerValidation, loginValition };