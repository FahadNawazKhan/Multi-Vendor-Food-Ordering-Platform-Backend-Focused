import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user',
        required: true
    },
    refreshToken: {
        type: String,
        default: ""
    }
}, { timestamps: true })

userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema)