import { ResponseError } from "../error/response-error.js";
import Comment from "../model/Comment.js";
import { createCommentValidation, deleteCommentValidation, getCommentValidation } from "../validator/comment-validator.js";
import { validate } from "../validator/validation.js";

export const createCommnetService = async (user, request) => {
    const comment = validate(createCommentValidation, request)

    return await Comment.create({
        ...comment,
        userId: user
    })
}

export const getcommentService = async (request) => {
    const postId = validate(getCommentValidation, request)

    return await Comment.findAll({
        where: {
            postId: postId
        },
        order: [['createdAt', 'DESC']]
    })
}

export const deleteCommentService = async (request) => {
    const comment = validate(deleteCommentValidation, request)
    const deleteComment = await Comment.destroy({
        where: {
            id: comment.id,
            userId: comment.userId
        }
    })
    if (deleteComment < 1) {
        throw new ResponseError(403, 'you can delete only your commment')
    }
    return deleteComment

}

