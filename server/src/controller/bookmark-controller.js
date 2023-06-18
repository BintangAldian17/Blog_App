import { createBookMarkService, getBookMarkService } from "../service/bookmark-service.js"

export const createBookmark = async (req, res, next) => {
    try {
        const request = {
            postId: req.body.postId,
            userId: req.userId
        }
        const result = await createBookMarkService(request)
        res.status(201).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const getBookMark = async (req, res, next) => {
    try {
        const userId = req.userId
        const result = await getBookMarkService(userId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}