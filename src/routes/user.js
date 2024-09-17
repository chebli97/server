import express from "express"
import { loginUser, registerUser, validAccount } from "../controllers/user.js"

export const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/valid-account/:tovalid',validAccount);

