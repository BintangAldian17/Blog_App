import { credentialsReq, publicRequest } from "../../axios/requestMethod";
import { useQuery } from "@tanstack/react-query"

const getPosts = async (category, top) => {
    const { data } = await publicRequest.get(`/posts?category=${category}&top=${top}`)
    return data
}

const getSinglePost = async (postId) => {
    const { data } = await publicRequest.get(`/post/${postId}`)
    return data
}

const getOtherPost = async (postId, userId) => {
    const { data } = await publicRequest.get(`/post/${postId}/${userId}`)
    return data
}

const getSingleLike = async (postId) => {
    const { data } = await publicRequest.get(`/like/${postId}`)
    return data
}

const getComment = async (postId) => {
    const { data } = await publicRequest.get(`/comment/${postId}`)
    return data
}

export const useGetPosts = (category, top) => {
    return useQuery(['posts', category, top], () => getPosts(category, top))
}

export const useGetSinglePost = (postId) => {
    return useQuery(['single-post', postId], () => getSinglePost(postId), {
        enabled: !!postId
    })
}

export const useGetOtherPost = (postId, userId) => {
    return useQuery(['other-post', postId, userId], () => getOtherPost(postId, userId), {
        enabled: !!postId && !!userId
    })
}

export const useGetSingleLike = (postId) => {
    return useQuery(['single-like', postId], () => getSingleLike(postId))
}

export const useGetComment = (postId) => {
    return useQuery(['comment', postId], () => getComment(postId))
}