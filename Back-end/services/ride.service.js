const mapService=require('./maps.service')
const rideModel=require('../models/ride.model');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');
async function getFare(pickup,destination){
    if(!pickup||!destination)
    {
        throw new Error('Pickup and Destination are required');
    }
    const distanceTime=await mapService.getDistanceTime(pickup,destination);
    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + (distanceTime.distance.value/1000 * perKmRate.auto) + (distanceTime.duration.value/60 * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceTime.distance.value/1000 * perKmRate.car) + (distanceTime.duration.value/60 * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + (distanceTime.distance.value/1000 * perKmRate.bike) + (distanceTime.duration.value/60 * perMinuteRate.bike))
    };

    return fare;
}
module.exports.getFare=getFare

function generateOtp(num) {
    if (!num || typeof num !== 'number' || num <= 0) {
        throw new Error('Number of digits must be a positive integer');
    }
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}
module.exports.createRide=async({
user,pickup,destination,vehicleType
})=>{
    if(!user||!pickup||!destination||!vehicleType)
    {
        throw new Error('All fields are required');
    }
    const fare=await getFare(pickup,destination);
    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp:generateOtp(6),
        fare:fare[vehicleType]//When you use bracket notation, like:

        
        // fare[vehicleType]
        // JavaScript knows that you might be passing a variable, expression, or computed value inside the brackets. So it evaluates what's inside:
        
        // "Get the property of fare whose key is the value stored in the variable vehicleType."
        
        // So if:
        
        
        // vehicleType = 'car'
        // Then:
        
        
        // fare[vehicleType]  // ➜ fare['car']
        // That’s exactly what you want.
        
        // 🚫 Why Dot Notation Fails:
        // When you use dot notation, like:
        
        
        // fare.vehicleType
        // JavaScript does NOT evaluate vehicleType as a variable. It treats it as a literal property name.
    })
    return ride;
}
module.exports.confirmRide=async({
    rideId,captainId
})=>{
    if(!rideId){
        throw new Error('Ride does not exist');
    }
    const ride=await rideModel.findOneAndUpdate({
        _id:rideId
    }

    ,{
        status:'accepted',
        captain:captainId
    },{new:true}).populate('captain').populate('user').select('+otp');
    return ride;
}
module.exports.startRide=async({rideId,otp,captain})=>{
    if(!rideId||!otp)
    {
        throw new Error('ride id and otp are required')
    }
    const ride=await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        captain:captain?._id
    },{new:true}).populate('user').populate('captain').select('+otp');
    if(!ride)
    {
        throw new Error('Ride not found')
    }
    if(ride.status!=='accepted')
    {
        throw new Error('Ride not accepted')
    }
    if(ride.otp!==otp)
    {
        throw new Error('Invalid OTP')
    }
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'ongoing'
    })
    ride.status='ongoing'
    // sendMessageToSocketId(ride.user.socketId,{
    //     event:'ride-started',
    //     data:ride
    //})
    return ride;
}
module.exports.endRide=async({rideId,captain})=>{
    if(!rideId){
        throw new Error('Ride id is required')
    }
    const ride=await rideModel.findOne({
        _id:rideId,
        captain:captain._id
    }).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status!=='ongoing'){
        throw new Error('Ride not ongoing');
    }
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:'completed'    
    })
    return ride;
}
//when we call a async function then also we will use await
// 1. useState & Re-rendering:
// State Variables in React (like useState) persist their values across re-renders unless you update them. When a component re-renders, React will re-initialize state values based on the last update.

// If you want a state to reset after every render, you need to manually reset the state during the render cycle (e.g., by calling setState() inside useEffect or a handler).

// 2. Socket Events & Payload:
// Socket Events handle data for the current event cycle. Once an event is emitted, its payload is processed for that specific trigger.

// If you use socket.on, the payload from the server will be passed on each event trigger. If the event handler doesn't change or get re-attached on each render, the payload will stay the same for that render.

// 3. Using try-catch:
// Without try-catch, unhandled errors can cause the server to crash or fail unexpectedly, especially when working with asynchronous operations.

// Using try-catch ensures that even if an error occurs (e.g., in async code like axios requests), the error is caught and handled without crashing the application. You can log errors, provide feedback, or handle the error gracefully.

// In essence:

// useState persists its value, but can be re-initialized based on user interaction or re-render triggers.

// Socket.io will deliver data to listeners during the current cycle, but it does not "remember" data between events.

// try-catch is essential for preventing crashes and managing errors gracefully in your app.








