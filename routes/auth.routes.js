import express from 'express'

export const authRouter = express.Router()

authRouter.post('/auth/register')
authRouter.post('/auth/login')

authRouter.use((req,res) => {
    res.send('Route Not Found');
})