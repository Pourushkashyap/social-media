import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  password: {
    type: String,
    required: true
  },
  avatar:{
    type:String,
    default:""
  },
  bio:{
    type:String,
    maxlength:200,
    default:""
  },
  followers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Fixed typo from "Userr" to "User"
      validate: {
        validator: (id) => mongoose.Types.ObjectId.isValid(id),
        message: 'Invalid ObjectId in followers array',
      },
    },
  ],
  following:[
   {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator: (id) => mongoose.Types.ObjectId.isValid(id),
        message: 'Invalid ObjectId in following array',
      },
    },
  ],
  refreshtoken: {
    type: String
  }
},
{
  // Ensure followers and following are always arrays
  default: {
    followers: [],
    following: [],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.ispasswordcorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// ✅ Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username 
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
