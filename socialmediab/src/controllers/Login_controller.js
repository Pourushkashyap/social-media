import {User} from "../model/User.js"
import { asynchandler } from '../utils/Asynchandler.js';
import { Apierror } from '../utils/Apierror.js';
import { Apiresponse } from '../utils/Apiresponse.js';

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

    if (!name.trim() || !username || !email || !password) {
        throw new Apierror(400, "All fields are required");
    }

    const existuser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existuser) {
        throw new Apierror(400, "user with username or email already exist");
    }

    const user = await User.create({
        name,
        username,
        email,
        password
    });

    const createuser = await User.findById(user.id).select("-password");

    if (!createuser) {
        throw new Apierror(500, "something went wrong while creating a user");
    }

    return res.status(201).json(
        new Apiresponse(200, createuser, "user registered successfully")
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

    const loginuser = await User.findById(user._id).select("-password -refreshtoken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accesstoken", accesstoken, options)
        .cookie("refreshtoken", refreshtoken, options)
        .json(
            new Apiresponse(200, {
                user: loginuser, accesstoken, refreshtoken
            }, "user logged in successfully")
        );
});

export { register, login };















// import {User} from '../models/User.js';
// import {asynchandler} from '../utils/Asynchandler.js';
// import {Apierror} from '../utils/Apierror.js';
// import {Apiresponse} from '../utils/Apiresponse.js';

// const generateaccessandresfreshtoken = async(userid)=>{
//     try{
//         const user = await User.findById(userid)
//         const refreshtoken = user.generateaccesstoken()
//         const accesstoken = user.generaterefreshtoken()

//         user.refreshtoken = refreshtoken
//         await user.save({validateBeforeSave:false})
//         return {accesstoken, refreshtoken}
//     }
//     catch(err){
//         throw Apierror(500,"something went wrong while generating refresh and access token")

//     }

// }

// const register = asynchanlder(async(req,res) =>{
//     const {name,username,email,password} = req.body

//     if(!name.trim() || !username || !email || !password){ 
//          throw new Apierror(400,"All fields are required")
//     }

//     const existuser = await User.findOne({
//         $or:[{username},{email}]
//     })

//     if(existuser){
//         throw new Apierror(400,"user with username or email already exist")
//     }
//     const user = await User.create({
//         name,
//         username,
//         email,
//         password
//     })
//     const createuser = await User.findById(user.id).select("password")
//     if(!createuser){
//         throw new Apierror(500,"something went wrong while creating a user")
//     }
//     return res.status(201).json(
//         new Apiresponse(200,createuser,"user registered successfully")
//     )
// })


// const login = asynchandler(async(res,res) =>{
//     const {username,password} = req.body

//     if(!username || !password){
//         throw new Apierror(400,"username and password are required")

//     }

//     const user = await User.findone({
//         $or:[{username}]
//     })
//     if(!user){
//         throw new Apierror(400,'user does not valid')
//     }
//     const ispasswordcorrect = user.ispasswordcorrect(password)
//     if(!ispasswordcorrect){
//         throw new Apierror(400,"Apiresponse does not match")

//     }
//     const {accesstoken,refreshtoken} = await generateaccessandresfreshtoken(user._id)

//     const loginuser = await User.findById(user._id).select(
//         "-password refreshtoken"
//     )
//     const options = {
//         httpOnly:true,
//         secureL:true
//     }
    
//     return res.status(200)
//     .cookie("accesstoken",accesstoken,options)
//     .cookie("refreshtoken",refreshtoken,options)
//     .json (
//         new Apierror(200,{
//             user:loginuser,accesstoken,refreshtoken
//         },
//         "user logged in successfully"
//     )
// })

