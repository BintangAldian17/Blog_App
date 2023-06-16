import express from "express"
import dotenv from "dotenv"
import db from "./config/Database.js"
import cookieParser from "cookie-parser"
import router from "./routes/route.js"
import cors from "cors"
import bodyParser from "body-parser"
import { errorMiddleware } from "./middleware/error-middleware.js"
import Category from "./model/Category.js"
import Post from "./model/Post.js"

dotenv.config()

const app = express()

try {
    await db.authenticate()
    console.log('Databse connected');
} catch (error) {
    console.log(error);
}

const port = 8800

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(errorMiddleware)
app.use('/api/v1', router)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).json(errorMessage)
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})