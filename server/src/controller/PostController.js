import { createPostService, deletePostService, getPostService } from "../service/post-service.js"
import Post from "../model/Post.js";

export const creatPost = async (req, res, next) => {
    try {
        const userId = req.userId
        const request = req.body
        const result = await createPostService(userId, request)
        res.status(201).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}
export const getAllPosts = async (req, res, next) => {
    try {
        const query = {
            category: req.query.category,
            page: req.query.page
        }
        const result = await getPostService(query)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const getSinglePost = (req, res) => {

}

export const deletePost = async (req, res, next) => {
    try {
        const request = {
            postId: req.body.postId,
            userId: req.userId
        }
        const result = await deletePostService(request)
        res.status(200).json('delete post succsesfully')
    } catch (error) {
        next(error)
    }
}


