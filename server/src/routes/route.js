import { login, logout, register } from "../controller/UserController.js";
import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js";
import { creatPost, deletePost, getAllPosts, getOtherPosts, getSinglePost } from "../controller/PostController.js";
import { createLikePost, unLikePost } from "../controller/LikePostController.js";
import { createCommnet, deleteComment, getComment } from "../controller/CommentController.js";
import { createBookmark, getBookMark } from "../controller/bookmark-controller.js";

const router = express.Router()

// user auth
router.post("/register", register)
router.post("/login", login)
router.post("/logout", verifyToken, logout)

// post
router.post("/post", verifyToken, creatPost)
router.get("/posts", getAllPosts)
router.delete("/post/:postId", verifyToken, deletePost)
router.get("/post/:postId", getSinglePost)
router.get("/post/:postId/:userId", getOtherPosts)

// comment
router.post("/comment", verifyToken, createCommnet)
router.get("/comment/:postId", getComment)
router.delete("/comment/:id", verifyToken, deleteComment)

// like
router.post("/like", verifyToken, createLikePost)
router.delete("/like/:id", verifyToken, unLikePost)

// bookmark
router.post("/bookmark", verifyToken, createBookmark)
router.get("/bookmark", verifyToken, getBookMark)

export default router