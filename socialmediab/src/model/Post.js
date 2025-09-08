import mongoose from "mongoose"

const Postschema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    caption:{
        type:String,
        max:300,
    },
    image:{
        type:String,
        required:true,
    },
    likes:[
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    
       }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
}, {timestamps:true});


export const Post = mongoose.model("Post",Postschema)