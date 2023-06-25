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
            attributes: ['heading', 'createdAt', 'category_name'],
            include: [
                {
                    model: User,
                    attributes: ['username', 'id', 'avatar']
                }
            ]
        },
        order: [['createdAt', 'DESC']]
    })
}

export const deleteBookMarkService = async (request) => {
    const bookmark = validate(deleteBookMarkValidation, request)
    const deleteBookMark = await BookMark.destroy({
        where: {
            id: bookmark.bookmarkId,
            postId: bookmark.postId,
            userId: bookmark.userId
        }
    })

    if (deleteBookMark < 1) {
        throw ResponseError(403, 'you can only delete your bookmark')
    }
    if (!bookmark.bookmarkId) {
        throw ResponseError(404, 'bookmark not found')
    }
    if (!bookmark.postId) {
        throw ResponseError(404, 'post not found')
    }
    return deleteBookMark
}