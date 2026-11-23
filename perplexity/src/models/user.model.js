import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,

    },
    isEmailVerified: {
        type: Boolean,
        default: false

    },
    emailVerificationToken: {
        type:String
    },
    emailVerificationExpires: {
        type: Date
    }
}, {
    timestamps: true
}
)

const userModel = mongoose.model('User', userSchema)
export  default userModel