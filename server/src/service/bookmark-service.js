import BookMark from "../model/BookMark.js";
import Post from "../model/Post.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validator/validation.js";
import { getBookMarkValidation, deleteBookMarkValidation, createBookMarkValidation } from "../validator/bookmark-validation.js";
import User from "../model/User.js";

export const createBookMarkService = async (request) => {
    const bookmark = validate(createBookMarkValidation, request)
    return await BookMark.create({
        postId: bookmark.postId,
        userId: bookmark.userId
    })
}

export const getBookMarkService = async (request) => {
    const userId = validate(getBookMarkValidation, request)
    return await BookMark.findAll({
        where: {
            userId: userId
        },
        include:
        {
            model: Post,
            attributes: ['id', 'heading', 'category_name', 'createdAt']
        },
        order: [['createdAt', 'DESC']]
    })
}

export const deleteBookMarkService = async (request) => {
    const bookmark = validate(deleteBookMarkValidation, request)

    return await BookMark.destroy({
        where: {
            postId: bookmark.postId,
            userId: bookmark.userId
        }
    })
}