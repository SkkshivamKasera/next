import {connectToDB, cookieSetter} from "@/utils/feature";
import {User} from "@/models/user";
import {use} from "bcrypt/promises";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    try{
        connectToDB()
        const data = await req.json()
        const {name, email, password} = data
        if (!name || !email || !password) {
            return Response.json({success: false, message: "⚠️All Fields Are Required⚠️"}, {
                status: 400
            })
        }
        let user = await User.findOne({email: email})
        if (user) {
            return Response.json({success: false, message: "⚠️User Already Exist⚠️"}, {
                status: 400
            })
        }
        user = await User.create({
            name: name,
            email: email,
            password: password
        })
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY)
        cookieSetter(true, token)
        return Response.json({success: true, message: "🎉Registered Successfully🎉", user}, {
            status: 200
        })
    }catch (error){
        return Response.json({success: false, message: error.message}, {
            status: 500
        })
    }
}