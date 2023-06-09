import User from "../model/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";
import { loginService, logoutService, registerService } from "../service/user-service.js";

// Register
// export const register = async (req, res, next) => {
//     const { username, email, password, confPassword } = req.body;
//     const findUsername = await User.findOne({ where: { username: username } })
//     const findEmail = await User.findOne({ where: { email: email } })
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt)

//     if (findUsername || findEmail) {
//         return next(createError(400, "User or Email already exist"))
//     } else if (password !== confPassword) {
//         return next(createError(400, "password and confirm password do not match"))
//     } else {
//         try {
//             await User.create({
//                 username: username,
//                 email: email,
//                 password: hashPassword
//             })
//             res.status(201).json('register success')
//         } catch (error) {
//             next(error)
//         }
//     }

// }

export const register = async (req, res, next) => {
    try {
        const request = req.body
        const result = await registerService(request)
        res.status(201).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const request = req.body
        const result = await loginService(request)
        const { createdAt, updatedAt, password, ...others } = result
        const token = jwt.sign(others, 'secret')
        res.cookie('accsessToken', token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000
        }).status(200).json(others)
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        const userId = req.userId
        await logoutService(userId)
        res.clearCookie("accsessToken", {
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).status(200).json("User has been logged out")
    } catch (error) {
        next(error)
    }
}

// export const login = async (req, res, next) => {
//     const { email, password } = req.body
//     try {
//         const user = await User.findOne({ where: { email: email } })
//         if (!user) return next(createError(404, "User not found"))
//         const match = await bcrypt.compare(password, user.password)
//         if (!match) return next(createError(400, "Wrong password"))
//         const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, 'secret')
//         res.cookie('accsessToken', token, {
//             httpOnly: true,
//             maxAge: 2 * 24 * 60 * 60 * 1000
//         }).status(200).json({ id: user.id, username: user.username, avatar: user.avatar, email: user.email })
//     } catch (error) {
//         next(error)
//     }
// }

