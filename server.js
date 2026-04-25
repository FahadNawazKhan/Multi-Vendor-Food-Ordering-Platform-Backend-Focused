import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './config/dbconnect.js'


dotenv.config()
const server = express()
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log('server is running at port:', PORT);
})