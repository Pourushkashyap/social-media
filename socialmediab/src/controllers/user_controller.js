import {User} from "../model/User.js"
import {asynchandler} from "../utils/Asynchandler.js"
import {Apierror} from "../utils/Apierror.js"
import {Apiresponse} from "../utils/Apiresponse.js"
import mongoose from "mongoose"
const searchuser = asynchandler(async(req,res) =>{
    const {query} = req.query;
    if(!query || query.trim() === ""){
        throw new Apierror(400,"Search query is required")
    }

     const users = await User.find({
        $and: [
            { _id: { $ne: req.user._id } },   // exclude current logged-in user
            {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { username: { $regex: query, $options: "i" } }
                ]
            }
        ]
    }).select("-password -refreshtoken");

    return res.status(200).json(
        new Apiresponse(200,users,"User fetch successfully")
    );

});

const togglefollow = asynchandler(async(req,res) =>{
    if (!req.user) {
    throw new Apierror(401, 'Unauthorized: No user authenticated');
  }
    const {username} = req.query;
    if(!username || !username.trim()){
        throw new Apierror(400,"username is empty")
    }
   const targetuser = await User.findOne({
    username: { $regex: `^${username.trim()}$`, $options: 'i' },
  });

    if(!targetuser){
        throw new Apierror(404,"user not found")
    }

    const currentuser = await User.findById(req.user._id);

   if(currentuser._id.toString() === targetuser._id.toString()){
    throw new Apierror(400,"You cannot follow yourself")
   }

   if (!mongoose.Types.ObjectId.isValid(targetuser._id) || !mongoose.Types.ObjectId.isValid(currentuser._id)) {
    throw new Apierror(400, 'Invalid user ID');
  }

   let message;

   if(currentuser.following.includes(targetuser._id)){
    currentuser.following = currentuser.following.filter(
        (id) => id.toString() !== targetuser._id.toString())
        targetuser.followers = targetuser.followers.filter(
            (id) => id.toString() !== currentuser._id.toString())
            message = "unfollow successfully";

   }

   else{
    currentuser.following.push(targetuser._id);
    targetuser.followers.push(currentuser._id);
    message ="follow successfully"
   }

   console.log('Before save - currentuser:', JSON.stringify(currentuser, null, 2));
   console.log('Before save - targetuser:', JSON.stringify(targetuser, null, 2));

  await currentuser.save({ validateBeforeSave: true });
  await targetuser.save({ validateBeforeSave: true });

   return res.status(200)
   .json(new Apiresponse
    (200,
  {
        currentuser: currentuser,
        targetuser: targetuser,
        currentUserId: currentuser._id,
      },message));


    
   

})


const getuserconnection = asynchandler(async(req,res) =>{
   const {username} = req.query;
   let user;
   
   
  if (username) {
    // username se user find
    user = await User.findOne({
      username: { $regex: `^${username.trim()}$`, $options: "i" }
    })
       
    .populate("followers", "name username avatar bio followers following")
      .populate("following", "name username avatar bio followers following");
  }
    else {
    // warna current logged-in user ke connections do
    user = await User.findById(req.user._id)
      .populate("followers", "name username avatar bio followers following")
      .populate("following", "name username avatar bio followers following");
  }

   

    
    
    
    

    if(!user){
       throw new Apierror(404, "User not found")
    }

    res.status(200).json(
        new Apiresponse(200,
            {
               followers: user.followers,
               following: user.following,

            },
            "user connection fetch successfully"
        )
    )
})

const getUserById = asynchandler(async(req,res) =>{
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    throw new Apierror(400, "Invalid user ID");
  }

  const user = await User.findById(id).select("password -refreshtoken");

  if(!user){
    throw new Apierror(404, "User not found");
  }

  return res.status(200)
            .json(new Apiresponse(200,"User fetch successfully"));   
})


export {searchuser, togglefollow,getuserconnection, getUserById}