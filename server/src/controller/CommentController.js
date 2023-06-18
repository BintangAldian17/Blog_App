import Comment from "../model/Comment.js";
import { createCommnetService, deleteCommentService, getcommentService } from "../service/comment-service.js";

export const createCommnet = async (req, res, next) => {
    try {
        const request = req.body
        const userId = req.userId
        const result = await createCommnetService(userId, request)
        res.status(201).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const getComment = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const result = await getcommentService(postId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const request = {
            userId: req.userId,
            id: req.params.id
        }
        await deleteCommentService(request)
        res.status(200).json('delete post succsesfuly')
    } catch (error) {
        next(error)
    }
}