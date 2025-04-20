const mapService=require('./maps.service')
const rideModel=require('../models/ride.model');
const crypto = require('crypto');
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
        auto: baseFare.auto + (distanceTime.distance.value/1000 * perKmRate.auto) + (distanceTime.duration.value/60 * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance.value/1000 * perKmRate.car) + (distanceTime.duration.value/60 * perMinuteRate.car),
        bike: baseFare.bike + (distanceTime.distance.value/1000 * perKmRate.bike) + (distanceTime.duration.value/60 * perMinuteRate.bike)
    };

    return fare;
}

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
//when we call a async function then also we will use await