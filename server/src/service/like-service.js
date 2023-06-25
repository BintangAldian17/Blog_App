import { validate } from "../validator/validation.js";
import { createLikeValidation, getSingleLikeValidation } from "../validator/like-validation.js";
import LikePost from "../model/LikePost.js";
import { ResponseError } from "../error/response-error.js";

export const createLikePostService = async (user, postId) => {
    const like = await validate(createLikeValidation, postId)
    const check = await LikePost.findOne({
        where: {
            postId: like,
            userId: user
        }
    })
    if (!check) {
        return await LikePost.create({
            postId: like,
            userId: user
        })
    } else {
        throw new ResponseError(400, 'you already create like')
    }
}

export const deleteLikePostService = async (user, postId) => {
    const like = await validate(createLikeValidation, postId)
    const check = await LikePost.findOne({
        where: {
            postId: like,
            userId: user
        }
    })
    if (check) {
        return await LikePost.destroy({
            where: {

                postId: like,
                userId: user
            }
        })
    } else {
        throw new ResponseError(400, 'you unlready like a post')
    }
}

export const getSingleLikeService = async (request) => {
    const postId = await validate(getSingleLikeValidation, request)
    return await LikePost.findAll({
        where: {
            postId: postId
        },
        attributes: ['userId']
    })
}


