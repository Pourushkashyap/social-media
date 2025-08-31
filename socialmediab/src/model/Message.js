import mongoose from "mongoose"

const messageschema = new mongoose.Schema({
    sender:{
        type:String,
        required:true,
    },
    receiver:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true, 
    },
    delivered:{
        type:Boolean,
        default:false,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
})


export const Message =  mongoose.model("Message",messageschema)
