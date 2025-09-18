import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_RESET } from "@/constants"
import { ResponseProps } from "@/types";
import axios from "axios";


const IMAGE_API_REL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileCloudinary = async (
  file:{uri:string} | string,
  folderName:string
):Promise<ResponseProps>{

try {
  if(!file)return {success:true,data:null};
  // already upload file url
  if(typeof file == "string") return {success:true,data:file};
  if (file && file.uri) {
      // ready to upload
      const formData = new FormData();
      formData.append("file",{
        uri:file?.uri,
        type:"image/jpeg",
        name:file?.uri.split('/').pop() || "file.jpg"
      }as any);
      formData.append("upload_preset",CLOUDINARY_UPLOAD_RESET)
      formData.append("folder",folderName)

      const response = await axios.post(IMAGE_API_REL,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      
  }
} catch (error:any) {
  console.log("gor error on upload:",error);
  return {success:false,msg:error.message || "couldn't upload image"}
}

}


export const getAvatarPath = (file:any,isGroup=false)=>{
  if (file&& typeof file ==="string") {
    return file
  }
  if(file&& typeof file === "object") return file.API_URL
  if(isGroup) return require("../assets/images/defaultGroupAvatar.png")
  
  
    return require("../assets/images/defaultAvatar.png")
}