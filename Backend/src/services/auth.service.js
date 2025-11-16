import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js"
import {signToken} from "../utils/helper.js"
import { sendEmail } from "../utils/sendEmail.js"
import User from "../models/user.model.js"

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    
    sendEmail(
        newUser.email,
        "Welcome to Linkly 🎉",
        `<h2>Hey ${newUser.name},</h2>
        <p>Your account has been created successfully.</p>
        <p>Start shortening URLs now!</p>`
    );

    const token = await signToken({id: newUser._id, role: newUser.role})
    return {token,user: newUser}
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email)
    if(!user) throw new Error("Invalid email or password")
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken({id: user._id, role: user.role})
    return {token,user}
}
