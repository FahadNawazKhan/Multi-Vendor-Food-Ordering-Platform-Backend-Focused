import { User } from "../models/User.js"
import { createUser } from "../services/user.services.js"
import { comparePassword, hashPassword } from "../utils/bcrypt.js"
import { accessToken, refreshToken } from "../utils/jwt.js"

export const registerUser = async (req, res) => {
    try {
        const user = req.user

        const password = await hashPassword(user.password)
        user.password = password
        await createUser(user)

        res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            data: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: null
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.user

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const access = accessToken(user);
        const refresh = refreshToken(user)

        user.refreshToken = refresh
        await user.save()

        res.cookie('accessToken', access, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            tokens: { access, refresh },
            user: { id: user._id, email: user.email, fullname: user.fullname }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            data: null
        })
    }
}