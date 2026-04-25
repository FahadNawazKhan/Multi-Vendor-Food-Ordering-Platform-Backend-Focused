import { User } from "../models/User.js"
import { createUser } from "../services/createUser.js"
import { comparePassword, hashPassword } from "../utils/bcrypt.js"

export const registerUser = async (req, res) => {
    try {
        const user = req.user

        const password = await hashPassword(user.password)
        user.password = password
        await createUser(user)

        res.send({
            success: true,
            message: 'User Registered Successfully',
            data: user
        })

    } catch (error) {
        res.send({
            success: false,
            message: 'Internal Server Error',
            data: null
        })
        throw error
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.user

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const access = accessToken(user);
        const refresh = refreshToken(user);

        res.json({
            success: true,
            message: "Login successful",
            tokens: { access, refresh },
            user: { id: user._id, email: user.email, fullname: user.fullname }
        });

    } catch (error) {
        res.send({
            success: false,
            message: 'Internal Server Error',
            data: null
        })
        throw error
    }
}