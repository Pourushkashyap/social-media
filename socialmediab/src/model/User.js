// import mongoose,{Schema} from "mongoose"
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

// const userschema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true
//     },
//     username:{
//         type:String,
//         required:true,
//         lowercase:true,
//         trim:true,
//         unique:true,
//         index:true
//     },
//     email:{
//         type:String,
//         unique:true,
//         lowercase:true,
//         required:true
//     },
//     password:{
//         type:String,
//         required:[true,"password is required"]
//     },
//     refreshtoken:{
//         type:String
//     }
// },{timestamps:true})

// userschema.pre("save",async function(next){
//     if(!this.isModified("password")) return next;

//     this.password =await bcrypt.hash(this.password,10)
//     next()
// })

// userschema.methods.ispasswordcorrect = async function(password){
//     return await bcrypt.compare(password,this.password)
// }

// userschema.methods.generateaccesstoken = function(){
//     return jwt.sign(
//         {
//             _id:this.id,
//             email : this.email,
//             username:this.username
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:process.env.ACCESS_TOKEN_EXPIRE 
//         }
//     )
// }

// userschema.methods.generaterefershtoken =  function(){
//     return jwt.sign({
//         id:this._id,
//     },
//    process.env.REFRESH_TOKEN_SECRET,
//    {
//     expiresIn:process.env.REFRESH_TOKEN_EXPIRY
//    }
// )
// }
// export const User = mongoose.model("User",userschema);

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  refreshtoken: {
    type: String
  }
});

userSchema.methods.ispasswordcorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// ✅ Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    }
  );
};

// ✅ Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

export const User = mongoose.model("User", userSchema);
