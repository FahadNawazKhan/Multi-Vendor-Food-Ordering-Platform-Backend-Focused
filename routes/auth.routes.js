import express from 'express'
import { validateLogin, validateRegister, verifyToken } from '../middlewares/auth.middleware.js'
import { loginUser, registerUser } from '../controllers/auth.controllers.js'

export const authRouter = express.Router()

authRouter.post('/auth/register', validateRegister, registerUser)
authRouter.post('/auth/login', validateLogin, loginUser)