import express from 'express'
import { validateLogin, validateRegister } from '../middlewares/auth.middleware.js'
import { loginUser, registerUser } from '../controllers/auth.controllers.js'

export const authRouter = express.Router()

authRouter.post('/register', validateRegister, registerUser)
authRouter.post('/login', validateLogin, loginUser)