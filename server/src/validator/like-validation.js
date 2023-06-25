import Joi from "joi"

const createLikeValidation = Joi.string().required()

const getSingleLikeValidation = Joi.string().required()

export {
    createLikeValidation,
    getSingleLikeValidation
}