import Joi from "joi"

const createLikeValidation = Joi.string().required()

export {
    createLikeValidation
}