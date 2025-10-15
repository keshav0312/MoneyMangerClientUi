
import { ApiEndpoints } from "./ApiEndpoints";
const CLOUD_PRESET= "moneymanager";

export const uploadImage= async(imageFile)=>{
    const formData=new FormData();
    formData.append("file",imageFile);
    formData.append("upload_preset",CLOUD_PRESET);

    try{
        const response= await fetch(ApiEndpoints.UPLOAD_IMAGE,{
            method:"POST",
            body:formData
        });
        const data= await response.json();
        return data.secure_url;
    }catch(error){
        console.error("Error uploading image:",error);
        throw error;
    }
}         
