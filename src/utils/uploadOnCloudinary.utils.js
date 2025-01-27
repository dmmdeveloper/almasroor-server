import { v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv";
import { unlinkSync } from "node:fs"

dotenv.config({path:".env"});
cloudinary.config({
    cloud_name : process.env.CLOUDnAME,
    api_key : process.env.CLOUDaPIkEY,
    api_secret : process.env.CLOUDaPIsECRET
});



export const uploadOnCloudinary  = async(filePath)=>{
try {

    if(!filePath) return;
    const response = await cloudinary.uploader.upload(filePath)
    unlinkSync(filePath)
return response.url
} catch (error) {
    // unlinkSync(filePath)
    console.log("File is Not Uploaded"  , error);
}}