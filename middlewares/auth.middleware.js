import { User } from "../models/User.js";
import { comparePassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";

export const validateRegister = async (req, res, next) => {
    try {
        const user = req.body

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'invalid user',
                data: null
            })
        }

        if (!user.email || !user.password || !user.fullname || !user.phone) {
            return res.status(400).json({
                success: false,
                message: 'Missing Data',
                data: null
            });
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: null
        })
    }
}

export const validateLogin = (req, res, next) => {
    const user = req.body
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'invalid user',
            data: null
        })
    }

    if (!user.email || !user.password) {
        return res.status(400).json({
            success: false,
            message: 'Missing email or password',
            data: null
        });
    }

    req.user = user
    next()
}

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            data: null
        })
    }
}

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const isAllowed = allowedRoles.includes(user.role);

        if (!isAllowed) {
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            });
        }

        next();
    };
};