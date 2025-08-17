import {User} from "../model/User.js"
import {asynchandler} from "../utils/Asynchandler.js"
import {Apierror} from "../utils/Apierror.js"
import {Apiresponse} from "../utils/Apiresponse.js"

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

export {searchuser}