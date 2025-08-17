import { User } from "../model/User.js";
import { asynchandler } from "../utils/Asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { uploadoncloudinary } from "../utils/cloudinary.js";


const updateBio = asynchandler(async(req,res) =>{
    const {bio} = req.body;

    if(!bio || !bio.trim()){
        throw new Apierror(400,"bio cannot be empty")
    }
 
    const updateduser = await User.findByIdAndUpdate(req.user._id,
        {bio:bio.trim()},
        {new:true}
    ).select("-password -refreshtoken")

    if(!updateduser){
        throw new Apierror(404,"User not found")
    }
    return res.status(200).json(
        new Apiresponse(200,updateduser,"Bio update Successfully")
    )

})

const updateavatar = asynchandler(async(req,res) =>{
    const avatar = req.file?.path
    if(avatar){
        throw new Apierror(400,"avatar image is required")
    }
    const uploadavatar = await uploadoncloudinary(avatar)
    if(!uploadavatar){
        throw new Apierror(500,"Image not upload on cloudinary")
    }

    const user = await findByIdAndUpdate(req.user._id,{
        avatar:uploadavatar.secure_url
    },
    {
        new:true
    }
).select("-password -refreshtoken")
  
if(!user){
    throw new Apierror(404,"User not found")
}

  throw new Apierror(200,"avtar update successfully")  
})


const updateprofile = asynchandler(async(req,res) =>{
    const {bio} = req.body;
    let updateuser = {};
    if(bio && bio.trim()){
        updateuser.bio = bio.trim();
    }
   const avatar = req.file?.path;
//    console.log(avatar)
    if(req.file?.path){
        const uploadavatar = await uploadoncloudinary(req.file.path);
        if(!uploadavatar){
            throw new Apierror(500,"Image not upload on cloudinary")
        }
        // console.log("bhai cloudinary per image upload ho gyi")
        updateuser.avatar = uploadavatar.secure_url;
    }

    // console.log(updateuser.avatar)

    if(Object.keys(updateuser).length === 0){
        throw new Apierror(400,"Nothing to update")
    }

    const updateduser = await User.findByIdAndUpdate(req.user._id,updateuser,{
        new:true,
    }).select("-password -refreshtoken")

    return res
    .status(200)
    .json(new Apiresponse(200,updateduser,"profile updated successfully"))
    
})

export {updateBio,updateavatar,updateprofile}


