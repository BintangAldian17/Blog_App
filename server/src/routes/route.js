import { login, logout, register } from "../controller/UserController.js";
import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js";
import { creatPost, deletePost, getAllPosts, getCategory, getOtherPosts, getSinglePost } from "../controller/PostController.js";
import { createLikePost, getSingleLike, unLikePost } from "../controller/LikePostController.js";
import { createCommnet, deleteComment, getComment } from "../controller/CommentController.js";
import { createBookmark, deleteBookMark, getBookMark } from "../controller/bookmark-controller.js";

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
router.get("/like/:postId", getSingleLike)

// bookmark
router.post("/bookmark", verifyToken, createBookmark)
router.get("/bookmark", verifyToken, getBookMark)
router.delete("/bookmark/:postId/:bookmarkId", verifyToken, deleteBookMark)

// category
router.get("/category", getCategory)

export default router