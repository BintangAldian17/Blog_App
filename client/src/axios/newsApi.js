import axios from "axios";

const baseURL = "https://newsapi.org/v2"

export const newsApi = axios.create({
    baseURL: baseURL,
    method: 'GET',
    headers: {
        Authorization: import.meta.env.VITE_API_KEY,
        'X-api-Key': import.meta.env.VITE_API_KEY,
    }
})