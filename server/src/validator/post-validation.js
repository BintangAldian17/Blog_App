import Joi from "joi"

const createPostValidation = Joi.object({
    cover: Joi.string().required(),
    img: Joi.string().optional(),
    heading: Joi.string().min(10).required(),
    content: Joi.string().min(100).required(),
    category_name: Joi.string().required()
})

const getPostValidation = Joi.object({
    category: Joi.string().optional().allow('').default(''),
    page: Joi.number().min(1).positive(),
    top: Joi.number().default(0).min(0).max(1).optional()
})

const deletePostValidation = Joi.object({
    postId: Joi.string().required(),
    userId: Joi.string().required()
})

const getSinglePostValidation = Joi.string().required()

const getOtherPostValidation = Joi.string().required()
export {
    createPostValidation,
    getPostValidation,
    deletePostValidation,
    getSinglePostValidation,
    getOtherPostValidation
}