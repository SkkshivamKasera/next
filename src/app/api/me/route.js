import { isAuthenticated } from "@/utils/feature"

export const GET = async (req) => {
    try{
        const user = await isAuthenticated(req)
        if(!user){
            return Response.json({success: false, message: "Please Login"}, {
                status: 400
            })
        }
        return Response.json({success: true, user})
    }catch (error){
        return Response.json({success: false, message: error.message}, {
            status: 500
        })
    }
} 