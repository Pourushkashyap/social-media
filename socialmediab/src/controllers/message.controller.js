import { Message } from "../model/Message.js";
import { asynchandler } from "../utils/Asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { User } from "../model/User.js";


const messagehistory = asynchandler(async(req,res) =>{
    const username = req.user.username;

    if(!username){
        return Apierror(500,"username not found");
    }

    const message = await Message.find({
        $or: [{sender: username}, {receiver:username}]
    });

    

    const participants = new Set();

    message.forEach(msg =>{
        if(msg.sender !== username) participants.add(msg.sender);
        if(msg.receiver !== username) participants.add(msg.receiver);
    });

    const users = await User.find({username: {$in :[...participants]}})
    .select(" _id username name avatar");

    res.status(200)
    .json(new Apiresponse(200,users,"fetch successfully"))
   
})

export {messagehistory}