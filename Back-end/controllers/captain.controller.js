const captainModel=require('../models/captain.model')
const captainService=require('../services/captain.service');
const {validationResult}=require('express-validator');
const blacklistTokenModel=require('../models/blacklistToken.model')


module.exports.registerCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({
        errors:errors.array()
    });
}

const {fullname,email,password,vehicle}=req.body;
const isCaptain=await captainModel.findOne({email});
if(isCaptain)
{
    return res.status(201).json({message:'Captain Already'})
}
const hashedPassword=await captainModel.hashPassword(password);


const captain=await captainService.createCaptain({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword,
    color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    vehicleType:vehicle.vehicleType
})
const token=captain.generateAuthToken();
res.status(201).json({
    token,
    captain
}); 
}


module.exports.loginCaptain=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.json({
            errors:errors.array()
        })
    }
    const {email,password}=req.body;
    const captain=await captainModel.findOne({email}).select('+password');//if we will not select the this.password inside the method will not work
    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({
            message:'Invalid email or password'
        }) 
    }
    const token=captain.generateAuthToken();
    res.cookie('token',token,{
        httpOnly:false
    });
    //localStorage.setItem('token',token);
    res.status(200).json({token,captain});
}
module.exports.getCaptainProfile=async(req,res,next)=>{
    res.status(200).json({
        captain:req.captain
    })
}





module.exports.logoutCaptain=async(req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];


    await blacklistTokenModel.create({token});


    res.clearCookie('token');


    res.status(200).json({message:'Logout successfully'});
}
// Since localStorage is for client-side operations (browser), you cannot use it in Node.js (server-side). Instead, you should:

// Store the token in cookies for server-side use. This is a more secure way to persist the token between requests in server-side environments.

// Alternatively, you can send the token to the client and let the browser handle localStorage.


