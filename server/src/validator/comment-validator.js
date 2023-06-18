import Joi from "joi";

const createCommentValidation = Joi.object({
    text: Joi.string().required(),
    postId: Joi.string().required()
})

const getCommentValidation = Joi.string().required()

const deleteCommentValidation = Joi.object({
    id: Joi.number().required(),
    userId: Joi.string().required()
})

export {
    createCommentValidation,
    getCommentValidation,
    deleteCommentValidation
}