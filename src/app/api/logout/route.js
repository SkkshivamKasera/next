import {cookieSetter} from "@/utils/feature";

export const GET = async (req) => {
    try{
        cookieSetter(false, null)
        return Response.json({success: true, message: "🎉Logout Successfully🎉"}, {
            status: 200
        })
    }catch (error){
        return Response.json({success: false, message: error.message}, {
            status: 500
        })
    }
}