import Joi from "joi"

const createPostValidation = Joi.object({
    cover: Joi.string().required(),
    img: Joi.string().optional(),
    heading: Joi.string().min(10).max(20).required(),
    content: Joi.string().min(10).max(20).required(),
    category_name: Joi.string().required()
})

const getPostValidation = Joi.object({
    category: Joi.string().optional(),
    page: Joi.number().min(1).positive(),
})

const deletePostValidation = Joi.object({
    postId: Joi.string().required(),
    userId: Joi.string().required()
})

export {
    createPostValidation,
    getPostValidation,
    deletePostValidation
}