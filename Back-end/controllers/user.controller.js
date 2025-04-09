const userModel=require('../models/user-model')
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')
const blacklistTokenModel=require('../models/blacklistToken.model');
module.exports.registerUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {fullname,email,password}=req.body;
//before user is created
    const hashedPassword= await userModel.hashPassword(password);

    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword

    })
    const token=user.generateAuthToken();
    res.status(201).json({
        user,
        token
    })
};
module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    //since our by default behaviour for password i s set to select:false but in this case we need password that is why we can write .select('+password');
//     this.password (inside an instance method) can access the hashed password if the user document has already been fetched with that field (and if password is not excluded with select: false).
// If the password field is not included in the query result (because of select: false or select('+password')), this.password will not be available because the field wasn’t fetched from the database.
    const user=await userModel.findOne({email}).select('+password');
    if(!user)
    {
        return res.status(401).json({message:'Invalid Email or password'})
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message:'Invalid Email or password'});
    }
    const token=user.generateAuthToken();
    res.cookie("token",token);
    res.status(200).json({token,user});
}
module. exports.getUserProfile=async (req,res,next)=>{
    res.status(201).json(req.user);
}
module.exports.logoutUser=async (req,res,next)=>{
    const token=req.cookies.token||req.headers.authorisation?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({
        message:"User Logged Out"
    })
}