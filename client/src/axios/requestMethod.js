import axios from "axios"

export const credentialsReq = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})