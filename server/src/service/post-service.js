import { validate } from "../validator/validation.js"
import { createPostValidation, deletePostValidation, getPostValidation } from "../validator/post-validation.js"
import Post from "../model/Post.js"
import { ResponseError } from "../error/response-error.js"

import LikePost from "../model/LikePost.js"
import { Sequelize } from "sequelize"

export const createPostService = async (user, request) => {
    const post = validate(createPostValidation, request)
    return await Post.create({ ...post, userId: user })
}

export const getPostService = async (category) => {
    const getPost = validate(getPostValidation, category)

    let filter = {}
    if (getPost.category) {
        filter = {
            where: {
                category_name: getPost.category
            }
        }
    }
    return await Post.findAll({
        include: {
            model: LikePost,
            attributes: ['userId']
        },
        ...filter
    })
}

export const deletePostService = async (user, request) => {
    const deletePost = validate(deletePostValidation, request)

    if (user !== deletePost.userId) throw new ResponseError(400, 'you can dlete only your post')
    return Post.destroy({
        where: {
            id: deletePost.postId
        }
    })

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
