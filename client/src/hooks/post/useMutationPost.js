import { credentialsReq } from "../../axios/requestMethod";
import { useMutation } from "@tanstack/react-query"

const createPost = async (data) => {
    return await credentialsReq.post('/post', data)
}

const likePost = async (postId) => {
    return await credentialsReq.post('/like', postId)
}

const unlikePost = async (postId) => {
    return await credentialsReq.delete(`/like/${postId}`)
}

const addComment = async (data) => {
    return await credentialsReq.post('/comment', data)
}

export const useCreatePost = ({ ...rest }) => {
    return useMutation(createPost, { ...rest })
}

export const useLikePost = ({ ...rest }) => {
    return useMutation(likePost, { ...rest })
}

export const useUnlikePost = ({ ...rest }) => {
    return useMutation(unlikePost, { ...rest })
}

export const useAddComment = ({ ...rest }) => {
    return useMutation(addComment, { ...rest })
}