import axios from "axios";

const uploadCloudnary = async (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "blog_app");

    try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dbsawioum/image/upload", data)
        const { url } = res.data
        return url
    } catch (error) {
        console.log(error)
        return error.response.data

    }
}

export default uploadCloudnary