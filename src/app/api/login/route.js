import {connectToDB, cookieSetter} from "@/utils/feature";
import {User} from "@/models/user";
import jwt from 'jsonwebtoken'

export const POST = async (req) => {
    try{
        connectToDB()
        const data = await req.json()
        const {email, password} = data
        if (!email || !password) {
            return Response.json({success: false, message: "⚠️All Fields Are Required⚠️"},{
                status: 400
            })
        }
        const user = await User.findOne({email: email}).select("+password")
        if (!user) {
            return Response.json({success: false, message: "⚠️Invalid Email or Password⚠️"}, {
                status: 400
            })
        }
        const isMatched = await user.comparePassword(password)
        if (!isMatched) {
            return Response.json({success: false, message: "⚠️Invalid Email or Password⚠️"}, {
                status: 400
            })
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY)
        cookieSetter(true, token)
        return Response.json({success: true, message: "🎉Login Successfully🎉", user}, {
            status: 200
        })
    }catch (error){
        return Response.json({success: false, message: error.message}, {
            status: 500
        })
    }
}