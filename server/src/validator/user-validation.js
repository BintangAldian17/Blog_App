import Joi from "joi";

const registerValidation = Joi.object({
    username: Joi.string().min(6).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
    confPassword: Joi.string().required().valid(Joi.ref('password'))
})

const loginValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const getUserValidation = Joi.string().required()

export {
    registerValidation,
    loginValidation,
    getUserValidation
}