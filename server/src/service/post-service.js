import { validate } from "../validator/validation.js"
import { createPostValidation, deletePostValidation, getOtherPostValidation, getPostValidation, getSinglePostValidation } from "../validator/post-validation.js"
import Post from "../model/Post.js"
import { ResponseError } from "../error/response-error.js"
import LikePost from "../model/LikePost.js"
import { Sequelize } from "sequelize"
import Comment from "../model/Comment.js"
import User from "../model/User.js"

export const createPostService = async (user, request) => {
    const post = validate(createPostValidation, request)
    return await Post.create({ ...post, userId: user })
}

export const getPostService = async (category) => {
    const getPost = validate(getPostValidation, category)

    let whereCondition = {}
    let orderCondition = []

    console.log(orderCondition)

    if (getPost.top === 1 && getPost.category) {
        whereCondition.category_name = getPost.category
        orderCondition = [[Sequelize.literal('likesCount'), 'DESC'], ['createdAt', 'DESC']]
    }
    if (getPost.top === 1 && !getPost.category) {
        whereCondition = {}
        orderCondition = [[Sequelize.literal('likesCount'), 'DESC'], ['createdAt', 'DESC']]
    }
    if (getPost.top === 0 && getPost.category) {
        whereCondition.category_name = getPost.category
        orderCondition = []
    }

    const post = await Post.findAll({
        where: whereCondition,
        attributes: ['id', 'cover', 'img', 'heading', 'userId', 'category_name', 'createdAt', 'updatedAt',
            [Sequelize.fn('COUNT', Sequelize.col('likes.id'),), 'likesCount'],
            [Sequelize.fn('GROUP_CONCAT', Sequelize.col('likes.userId')), 'like'],
            [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount']
        ],
        include: [
            {
                model: User,
                as: "user",
                attributes: ['avatar', 'id', 'username'],
            },
            {
                model: LikePost,
                as: "likes",
                attributes: []
            }, {
                model: Comment,
                as: "comments",
                attributes: []
            }],
        group: ['post.id',],
        order: orderCondition,
        raw: true,
        nest: true
    })

    const convertUserIdToArray = post.map(e => ({ ...e, like: e.like ? e.like.split(',') : [] }))
    return convertUserIdToArray


}

export const deletePostService = async (user, request) => {
    const deletePost = validate(deletePostValidation, request)
    const deleteP = await Post.destroy({
        where: {
            userId: deletePost.userId,
            id: deletePost.postId
        }
    })
    if (deleteP < 1) {
        throw new ResponseError(403, 'you can delete only tour post')
    }
    if (!deletePost.postId) {
        throw new ResponseError(404, 'post not found')
    }
    else {
        return deleteP
    }
}

export const getSinglePostService = async (request) => {
    const postId = validate(getSinglePostValidation, request)
    return await Post.findByPk(postId, {
        include: [{
            model: LikePost,
            attributes: ['userId']
        }, {
            model: User,
            attributes: ['id', 'username', 'email', 'avatar']
        }]
    })
}

export const getOtherPostsService = async (request, postId) => {
    const userId = validate(getOtherPostValidation, request)
    const post = await Post.findAll({
        where: {
            userId: userId
        },
        attributes: ['id', 'heading', 'createdAt', 'category_name'],
        order: [['createdAt', 'DESC']],
        limit: 4
    })

    const filterPost = post.filter(e => e.id !== postId)
    return filterPost
}



// export const getPostServive = async (category, filter) => {
//     const post = validate(getPostValidation, category, filter)
//     console.log(post)
//     if (filter && !category) {
//         const getPost = await Post.findAll({
//             attributes: {
//                 include: [
//                     [
//                         Sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE `like`.`postId` = `Post`.`id`)'),
//                         'likeCount'
//                     ],
//                     [
//                         Sequelize.literal('(SELECT COALESCE(JSON_ARRAYAGG(JSON_OBJECT("id", `likes`.`id`, "createdAt", `likes`.`createdAt`, "updatedAt", `likes`.`updatedAt`, "userId", `likes`.`userId`, "postId", `likes`.`postId`)), JSON_ARRAY()) FROM `like` AS `likes` WHERE `likes`.`postId` = `Post`.`id`)'),
//                         'likes',
//                     ],
//                 ]

//             },
//             raw: true,
//             order: [[Sequelize.literal('likeCount'), 'DESC']],

//         })
//         const filtered = getPost.map(e => {
//             return Object.fromEntries(
//                 Object.entries(e).filter(([key]) => key !== 'likeCount')
//             )
//         })
//         return filtered
//         return getPost
//     } if (category && !filter) {
//         return await Post.findAll({
//             where: {
//                 category_name: post
//             },
//             order: [['createdAt', 'DESC']]
//         })
//     } if (category && filter) {
//         const getPost = await Post.findAll({
//             where: {
//                 category_name: post
//             },
//             attributes: {
//                 include: [
//                     [
//                         Sequelize.literal('(SELECT COUNT(*) FROM `like` WHERE `like`.`postId` = `Post`.`id`)'),
//                         'likeCount'
//                     ],
//                     [
//                         Sequelize.literal('(SELECT COALESCE(JSON_ARRAYAGG(JSON_OBJECT("id", `likes`.`id`, "createdAt", `likes`.`createdAt`, "updatedAt", `likes`.`updatedAt`, "userId", `likes`.`userId`, "postId", `likes`.`postId`)), JSON_ARRAY()) FROM `like` AS `likes` WHERE `likes`.`postId` = `Post`.`id`)'),
//                         'likes',
//                     ],
//                 ]

//             },
//             raw: true,
//             order: [[Sequelize.literal('likeCount'), 'DESC']],

//         })
//         const filtered = getPost.map(e => {
//             return Object.fromEntries(
//                 Object.entries(e).filter(([key]) => key !== 'likeCount')
//             )
//         })
//         return filtered
//     }
//     else {
//         return await Post.findAll({
//             order: [['createdAt', 'DESC']]
//         })
//     }
// }
