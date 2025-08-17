import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadoncloudinary = async(localfilepath) =>{
    try{
        if(!localfilepath)return null
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto",
            folder:"avatars",
            format:"jpg",
        })
        fs.unlinkSync(localfilepath) 
        return response
    }
    catch(err){
         if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        }
        console.log("file is not upload on cloudinary")
        return null;
    }
}

export {uploadoncloudinary}