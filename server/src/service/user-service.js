import { ResponseError } from "../error/response-error.js";
import User from "../model/User.js";
import { getUserValidation, loginValidation, registerValidation } from "../validator/user-validation.js";
import { validate } from "../validator/validation.js";
import bcrypt from "bcrypt"

export const registerService = async (request) => {
    const user = validate(registerValidation, request)
    const findUserName = await User.findOne({
        where: {
            username: user.username
        }
    })

    const findEmail = await User.findOne({
        where: {
            email: user.email
        }
    })
    // check user or email in db
    if (findEmail && findUserName) {
        throw new ResponseError(400, 'username and email already exist')
    }
    if (findEmail) {
        throw new ResponseError(400, 'email already exist')
    }
    if (findUserName) {
        throw new ResponseError(400, 'username already exist')
    }
    if (user.password !== user.confPassword) {
        throw new ResponseError(400, 'password and confirm password not match')
    }
    user.password = await bcrypt.hash(user.password, 10)

    const { confPassword, ...others } = user

    console.log(others)
    return await User.create(
        others
    )
}

export const loginService = async (request) => {
    const loginRequest = validate(loginValidation, request)

    const user = await User.findOne({
        where: {
            email: loginRequest.email
        },
        raw: true
    })

    if (!user) {
        throw new ResponseError(401, 'Username or password wrong')
    }
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
    console.log(isPasswordValid)
    if (!isPasswordValid) {
        throw new ResponseError(401, 'Username or password wrong')
    }

    return user
}

export const logoutService = async (request) => {
    const userId = validate(getUserValidation, request)

    const user = await User.findOne({
        where: {
            id: userId
        }
    })
    if (!user) {
        throw new ResponseError(404, 'user not found')
    }

}