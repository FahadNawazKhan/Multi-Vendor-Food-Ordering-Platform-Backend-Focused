import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { dbConnect } from './config/dbconnect.js'
import { authRouter } from './routes/auth.routes.js'

dotenv.config()
const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())
server.use(cookieParser())

server.use('/api/auth',authRouter)

server.use((req, res) => {
    res.send('Route Not Found');
})

server.listen(PORT, () => {
    console.log('server is running at port:', PORT);
})