import Joi from "joi";

const createBookMarkValidation = Joi.object({
    userId: Joi.string().required(),
    postId: Joi.string().required()
})

const getBookMarkValidation = Joi.string().required()

const deleteBookMarkValidation = Joi.object({
    userId: Joi.string().required(),
    postId: Joi.string().required(),
    bookmarkId: Joi.number().required()
})

export {
    createBookMarkValidation,
    getBookMarkValidation,
    deleteBookMarkValidation
}