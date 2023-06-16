import { login, register } from "../controller/UserController.js";
import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js";
import User from "../model/User.js";
import { creatPost, getAllPosts } from "../controller/PostController.js";
import { createLikePost, unLikePost } from "../controller/LikePostController.js";

const router = express.Router()

// user auth
router.post("/register", register)
router.post("/login", login)

// post
router.post("/post", verifyToken, creatPost)
router.get("/posts", getAllPosts)

// like
router.post("/like", verifyToken, createLikePost)
router.delete("/like/:id", verifyToken, unLikePost)

export default router