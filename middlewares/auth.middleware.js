import { comparePassword } from "../utils/bcrypt.js";

export const validateRegister = async (req, res, next) => {
    try {
        const user = req.body

        if (!user) {
            return res.send({
                success: false,
                message: 'invalid user',
                data: null
            })
        }

        if (!user.email || !user.password || !user.fullname || !user.role || !user.phone) {
            return res.send({
                success: false,
                message: 'Missing Data',
                data: null
            });
        }
        req.user = user
        next()
    } catch (error) {
        res.send({
            success: false,
            message: 'Internal Server Error',
            data: null
        })
        throw error
    }
}

export const validateLogin = (req, res, next) => {
    const user = req.body
     if (!user) {
            return res.send({
                success: false,
                message: 'invalid user',
                data: null
            })
        }

        if (!user.email || !user.password) {
            return res.send({
                success: false,
                message: 'Missing email or password',
                data: null
            });
        }

        req.user = user
        next()
}