import { v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv";
import { unlinkSync } from "node:fs"

dotenv.config({path:".env"});
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});



export const uploadOnCloudinary  = async(filePath)=>{
try {

    const response = await cloudinary.uploader.upload(filePath)
    unlinkSync(filePath)
return response.url
} catch (error) {
    unlinkSync(filePath)
    console.log("File is Not Uploaded"  , error);
}}