import mongoose, { Schema } from "mongoose";

const productivitySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        mood: {
            type: String,
            enum: ["happy", "neutral", "sad", "stressed"], 
            default: "neutral"
        },
        activity_data: {
            type:Object
        }

    },
    {timestamps:true}
)

export const Productivity = mongoose.model("Productivity",productivitySchema)
