import {connectToDB, isAuthenticated} from "@/utils/feature";
import {Task} from "@/models/task";

export const POST = async (req) => {
    try{
        connectToDB()
        const user = await isAuthenticated(req)
        if (!user) {
            return Response.json({success: false, message: "⚠️Please Login First⚠️"},{
                status: 400
            })
        }
        const data = await req.json()
        const {title, description} = data
        if(!title || !description){
            return Response.json({success: false, message: "⚠️All Fields Are Required⚠️"}, {
                status: 400
            })
        }
        const task= await Task.create({
            title: title,
            description: description,
            user: user._id
        })
        return Response.json({success: true, message: "🎉Task Added Successfully🎉", task:task}, {
            status: 200
        })
    }catch (error){
        return Response.json({success: false, message: error.message}, {
            status: 500
        })
    }
}