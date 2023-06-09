import { login, register } from "../controller/UserController.js";
import express from "express"
import { verifyToken } from "../middleware/VerifyToken.js";
import User from "../model/User.js";

const router = express.Router()

// user auth
router.post("/register", register)
router.post("/login", login)

export default router