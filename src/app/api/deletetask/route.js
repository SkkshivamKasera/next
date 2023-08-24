import {isAuthenticated} from "@/utils/feature";
import {Task} from "@/models/task";

export const DELETE = async (req) => {
    try{
        const user = await isAuthenticated(req)
        if (!user) {
            return Response.json({success: false, message: "⚠️Please Login First⚠️"}, {
                status: 400
            })
        }
        const {searchParams} = new URL(req.url)
        const task = await Task.findById(searchParams.get("id"))
        if (task.user.toString() !== user._id.toString()) {
            return Response.json({success: false, message: "⚠️You Cannot Delete This Task⚠️"},{
                status: 400
            })
        }
        await Task.findByIdAndDelete(searchParams.get("id"))
        return Response.json({success: true, message: "🎉Task Deleted Successfully🎉"},{
            status: 200
        })
    }catch (error){
        return Response.json({success: false, message: error.message}, {
            status: 500
        })
    }
}