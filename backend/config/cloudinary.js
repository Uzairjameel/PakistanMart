import { v2 as cloudinary } from 'cloudinary'; 
import { defaultMaxListeners } from 'events';
import fs from 'fs'

const uploadOnCloudinary = async (filepath) => {
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    if (!filepath) {
        return null
    }
    try {
        const uploadResult = await cloudinary.uploader
       .upload(filepath)
       fs.unlinkSync(filepath)
       return uploadResult.secure_url
    } catch (error) {
        fs.unlinkSync(filepath)
        console.log(error)
    }
}

export default uploadOnCloudinary