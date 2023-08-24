import mongoose from "mongoose";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {User} from "@/models/user";


export const connectToDB = () => {
    mongoose.connect(process.env.LOCAL_URI, {
        dbName: "NextToDo"
    }).then(() => {
        console.log("Connected")
    })
}

export const cookieSetter = (set, token) => {
    cookies().set("token", set ? token : "", {
        httpOnly: true,
        path: "/",
        maxAge: set ? 15*24*60*60*1000 : 0
    })
}

export const isAuthenticated = async (req) => {
    const cookieData = await req.cookies.get("token")
    if(!cookieData){
        return false
    }
    const token = cookieData.value
    const decoded = await jwt.verify(token, process.env.SECRET_KEY)
    return await User.findById(decoded.id)
}