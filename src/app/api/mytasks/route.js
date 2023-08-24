import {connectToDB, isAuthenticated} from "@/utils/feature";
import {Task} from "@/models/task";

export const GET = async (req) => {
    try{
        connectToDB()
        const user = await isAuthenticated(req)
        if (!user) {
            return Response.json({success: false, message: "⚠️Please Login First⚠️"},{
                status: 400
            })
        }
        const tasks = await Task.find({user: user._id})
        return Response.json({success: true, tasks}, {
            status: 200
        })
    }catch (error){
        return Response.json({success: false, message: error.message}, {
            status: 500
        })
    }
}