import {v2 as cloudinary} from "cloudinary"
import { log } from "console";
import fs from "fs"



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY ,
        api_secret: process.env.CLOUDINARY_API_SECRET,// Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath)=>{
         try{
            if(!localFilePath) return null;
            //Upload file on cloudinary
            const response=await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            //file has been uploaded succesfully
            //console.log("file uploaded", response.url);
            fs.unlinkSync(localFilePath)
            return response;
         } catch(error){
            fs.unlinkSync(localFilePath);/* Remove the lo
            ocally saved temp file as upload failed*/
            return null;
         }
    }

//     const uploadResult = await cloudinary.uploader
//     .upload(
//         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//             public_id: 'shoes',
//         }
//     )
//     .catch((error) => {
//         console.log(error);
//     });
 
//  console.log(uploadResult);

export {uploadOnCloudinary}