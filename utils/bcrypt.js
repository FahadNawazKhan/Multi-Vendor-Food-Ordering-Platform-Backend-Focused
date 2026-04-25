import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const salt = parseInt(process.env.SALT_ROUNDS) || 11

export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        throw new Error('Password hashing failed')
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        throw new Error('Password comparing failed')
    }
}