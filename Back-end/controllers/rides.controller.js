const rideService=require('../services/ride.service');
const {validationResult}=require('express-validator');
const mapsService=require('../services/maps.service');
const {sendMessageToSocketId}=require('../socket.js');
const userModel = require('../models/user-model.js');
const rideModel = require('../models/ride.model.js');
module.exports.createRide=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    //console.log('hello')
    const {pickup,destination,vehicleType}=req.body;
    
    try{
        let ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
        res.status(201).json(ride);

       //console.log(ride);
        const pickupCoordinates=await mapsService.getAddressCoordinates(pickup);
        //console.log(pickupCoordinates);
        const captainsInTheRadius=await mapsService.getCaptainsInTheRadius(pickupCoordinates.latitude,pickupCoordinates.longitude,10);
        //console.log(captainsInTheRadius);
        ride.otp="";
        const newRide= await rideModel.findOne({_id:ride?._id}).populate('user')//It’s used to automatically replace a referenced ObjectId in a document with the actual document it points to.
        console.log('hello');
        captainsInTheRadius.map( (captain)=>{
            //console.log(captain.socketId)
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:newRide
            })
        })
        
    }
    catch(err)
    {
        throw new Error(err)
    }
}
module.exports.getFare=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({
            error:error.array()//the res.json does not stop the execution of the function so we need to use return.
        })
    }
    const {pickup,destination}=req.query
    try{
        const fare=await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}
module.exports.confirmRide=async(req,res)=>{
 
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.json({
            error:error.array()
        })
    }
    const {rideId,captainId}=req.body;
    try{
        const ride=await rideService.confirmRide({rideId,captainId});
        //console.log(ride);
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })
        res.status(200).json(ride);
    }
    catch(err){
        throw new Error(err);
    }
}
module.exports.startRide=async(req,res)=>{
    console.log("2")
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            errors:errors.array()
        })
    }
    const {rideId,otp}=req.query;
    try{
        const ride=await rideService.startRide({rideId,otp,captain:req.captain});
        //console.log(ride.user.socketId);
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data:ride
        })
        return res.status(200).json(ride);
    }
    catch(err){
        throw new Error(err);
    }
}
module.exports.endRide=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({
            error:error.array()
        })
    }
    const {rideId}=req.body;
    try{
        const ride=await rideService.endRide({rideId,captain:req.captain});
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-ended',
            data:ride
        })
        return res.status(200).json(ride);
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}
//axios brings you the response and yuo can access that response(res) usingresponse.data