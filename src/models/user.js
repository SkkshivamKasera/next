import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: [8, "Password Must Be 8 Character Long"],
        select: false
    }
})

userModel.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userModel.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

mongoose.models = {}
export const User = mongoose.model("users", userModel)