const userModel=require("../models/user-model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const blacklistTokenModel=require('../models/blacklistToken.model')

const captainModel=require('../models/captain.model')

module.exports.authUser=async (req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];//ye do jagah mil sakta hai token and split function splits the string into a array of substrings on the basis of the parameter passed
    if(!token){
        return res.status(401).json({message:"Unauthorised"});
    }
    const isBlacklisted=await blacklistTokenModel.findOne({token:token});
    if(isBlacklisted){
        res.status(401).json({
            message:'Unauthorised'
        })
    }
    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await userModel.findById(decoded._id);
        req.user=user;//set user in the request
        return next();
    }
    catch(err){
        return res.status(201).json({
            err
        })
    }
}
module.exports.authCaptain= async (req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];//ye do jagah mil sakta hai token and split function splits the string into a array of substrings on the basis of the parameter passed
    if(!token){
        return res.status(401).json({message:"Unauthorised"});
    }
    const isBlacklisted=await blacklistTokenModel.findOne({token:token});
    if(isBlacklisted){
        res.status(401).json({
            message:'Unauthorised'
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain= await captainModel.findById(decoded._id);
        req.captain=captain;//set user in the request
        return next();
    }
    catch(error){
        return res.status(201).json({
            error
        })
    }
}
