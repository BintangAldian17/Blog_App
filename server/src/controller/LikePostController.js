import LikePost from "../model/LikePost.js";
import { createLikePostService, deleteLikePostService, getSingleLikeService } from "../service/like-service.js";

export const createLikePost = async (req, res, next) => {
    try {
        const userId = req.userId
        const postId = req.body.postId
        await createLikePostService(userId, postId)
        res.status(201).json('like post succsesfuly')
    } catch (error) {
        next(error)
    }
}

export const unLikePost = async (req, res, next) => {
    try {
        const userId = req.userId
        const postId = req.params.id
        await deleteLikePostService(userId, postId)
        res.status(200).json('unlike post succsesfuly')
    } catch (error) {
        next(error)
    }
}

export const getSingleLike = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const result = await getSingleLikeService(postId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}