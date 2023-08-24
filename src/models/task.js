import mongoose from "mongoose";

const taskModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is Required"]
    },
    description: {
        type: String,
        required: [true, "Description is Required"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

mongoose.models = {}
export const Task = mongoose.model("tasks", taskModel)