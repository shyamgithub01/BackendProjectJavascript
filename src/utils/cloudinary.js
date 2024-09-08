import { v2 as cloudinary }  from "cloudinary"
import fs from "fs"

const uplaodOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

console.log("file is uplaoded on teh cloudinary " , response.url);
        return response

    }catch(error){
        fs.unlink(localFilePath)
        return null
    }
}