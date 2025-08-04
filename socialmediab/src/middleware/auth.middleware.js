import {User} from '../model/User.js'
import { Apierror } from '../utils/Apierror.js'
import jwt from "jsonwebtoken"
import { asynchandler } from '../utils/Asynchandler.js'

export const verifyjwt = asynchandler(async (req,res,next) =>{
   try{
    const token = req.cookies?.accesstoken || req.header('Authorization')
    if(!token){
        throw new Apierror(401,"Unauthorized request")
    }

    const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = User.findById(decodedtoken?.id).select("-passwordrefreshtoken")

    if(!user){
        throw new Apierror(401,"Invalid access token")
    }
    req.user=  user
    next()
   }
   catch(err){
    throw new Apierror(401,err?.message || "Invalid access token")
   }
})


