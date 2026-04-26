import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const db = process.env.MONGO_URL

export const dbConnect = async () => {
    try {
        await mongoose.connect(db)
        console.log('Database Connected Successfully🟢');
    } catch (error) {
        console.log('Failed to connect with database🔴', error);
        process.exit(1);
    }
}

await dbConnect()