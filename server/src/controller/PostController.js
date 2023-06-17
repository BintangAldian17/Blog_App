import { createPostService, deletePostService, getOtherPostsService, getPostService, getSinglePostService } from "../service/post-service.js"
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
            top: req.query.top
        }
        const result = await getPostService(query)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getSinglePost = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const result = await getSinglePostService(postId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const request = {
            postId: req.params.postId,
            userId: req.userId
        }
        const userId = req.userId
        await deletePostService(userId, request)
        res.status(200).json('delete post succsesfully')
    } catch (error) {
        next(error)
    }
}

export const getOtherPosts = async (req, res, next) => {
    try {
        const request = {
            postId: req.params.postId,
            userId: req.params.userId
        }
        const result = await getOtherPostsService(request.userId, request.postId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}


