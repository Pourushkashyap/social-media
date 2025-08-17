import {User} from "../model/User.js"
import { asynchandler } from '../utils/Asynchandler.js';
import { Apierror } from '../utils/Apierror.js';
import { Apiresponse } from '../utils/Apiresponse.js';
import { uploadoncloudinary } from "../utils/cloudinary.js";

const generateaccessandresfreshtoken = async (userid) => {
    try {
        const user = await User.findById(userid);
        const accesstoken = user.generateAccessToken();
        const refreshtoken = user.generateRefreshToken();

        user.refreshtoken = refreshtoken;
        await user.save({ validateBeforeSave: false });

        return { accesstoken, refreshtoken };
    } catch (err) {
        throw new Apierror(500, "something went wrong while generating refresh and access token");
    }
};



const register = asynchandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !name.trim() || !username || !email || !password) {
        throw new Apierror(400, "All fields are required");
    }

    const existuser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existuser) {
        throw new Apierror(400, "User with username or email already exists");
    }

    let newUser;

    if (req.file?.path) {
        const uploadavatar = await uploadoncloudinary(req.file.path);
        if (!uploadavatar) {
            throw new Apierror(400, "Avatar upload to Cloudinary failed");
        }
        newUser = await User.create({
            name,
            username,
            email,
            password,
            avatar: uploadavatar.secure_url
        });
    } else {
        newUser = await User.create({
            name,
            username,
            email,
            password
        });
    }

    const createuser = await User.findById(newUser._id).select("-password");

    if (!createuser) {
        throw new Apierror(500, "Something went wrong while creating the user");
    }

    const { accesstoken, refreshtoken } = await generateaccessandresfreshtoken(createuser._id);

    const accessoptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000
    };

    const refreshoptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res.status(201)
        .cookie("accesstoken", accesstoken, accessoptions)
        .cookie("refreshtoken", refreshtoken, refreshoptions)
        .json(
            new Apiresponse(200, {
                user: createuser,
                accesstoken,
                refreshtoken
            }, "User registered successfully")
        );
});

const login = asynchandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new Apierror(400, "username and password are required");
    }
    
    console.log(username,password)

    const user = await User.findOne({
        $or: [{ username }]
    });

    if (!user) {
        throw new Apierror(400, 'user does not exist');
    }

    const ispasswordcorrect = await user.ispasswordcorrect(password);

    if (!ispasswordcorrect) {
        throw new Apierror(400, "password does not match");
    }

    const { accesstoken, refreshtoken } = await generateaccessandresfreshtoken(user._id);
   
    console.log("accesstoekn: ",accesstoken)
    console.log("refreshtoken: ",refreshtoken)


    const loginuser = await User.findById(user._id).select("-password -refreshtoken");

    const accessoptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // only secure in prod
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000
}

const refreshoptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
}

    return res
        .status(200)
        .cookie("accesstoken", accesstoken, accessoptions)
        .cookie("refreshtoken", refreshtoken, refreshoptions)
        .json(
            new Apiresponse(200, {
                user: loginuser, accesstoken, refreshtoken
            }, "user logged in successfully")
        );
});

const logout = asynchandler(async(req,res) =>{
    
    await User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshtoken:null
        }
    })
   
    const option = {
        httpOnly:true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax'
    }

    console.log("logout ho gya")
    
   return res.status(200)
          .clearCookie("accesstoken",option)
          .clearCookie("refreshtoken",option)
          .json(
           {message:"user logout successfully"}
          )

})

export { register, login,logout };










