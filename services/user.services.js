import { User } from "../models/User.js"

export const fetchDatabase = async () => {
    try {
        return await User.find()
    } catch (error) {
        throw error
    }
}

export const createUser = async (user) => {
    try {
        return await User.create(user)
    } catch (error) {
        throw error
    }
}