import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './config/dbconnect.js'

dotenv.config()
const server = express()
const PORT = process.env.PORT || 3000

server.use(express.json())


server.use((req,res) => {
    res.send('Route Not Found');
})

server.listen(PORT, () => {
    console.log('server is running at port:', PORT);
})