import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
        },
        habits: [
            {
                type: Schema.Types.ObjectId,
                ref: "Habit"
            }
        ],
        logs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Productivity',
            },
        ],

        notificationSettings: {
            enabled: { type: Boolean, default: true },
            email: { type: Boolean, default: true },
            whatsapp: { type: Boolean, default: false },
            push: { type: Boolean, default: false }
        },
        
        pushSubscription: {
            endpoint: { type: String },
            keys: {
                p256dh: { type: String },
                auth: { type: String }
            }
        },

        refreshToken: {
            type: String,

        }
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)