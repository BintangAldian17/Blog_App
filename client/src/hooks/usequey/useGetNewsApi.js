import { useQuery } from "@tanstack/react-query"
import { newsApi } from "../../axios/newsApi"

const getNews = async () => {
    const { data } = await newsApi("https://newsapi.org/v2/top-headlines?country=us&pageSize=5")
    return data
}

export const useGetNews = () => {
    return useQuery(['news'], getNews)
}