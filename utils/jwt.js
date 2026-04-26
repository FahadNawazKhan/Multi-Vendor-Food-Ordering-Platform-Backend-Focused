import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const accessToken = (user) => {
    try {
        const payload = {
            id: user._id, email: user.email, role: user.role
        }
        return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '15m' })
    } catch (error) {
        throw error
    }
}

export const refreshToken = (user) => {
    try {
        const payload = {
            id: user._id
        }
        return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' })
    } catch (error) {
        throw error
    }
}

