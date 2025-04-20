const mapsService=require('../services/maps.service');
const {validationResult}=require('express-validator')
module.exports.getCoordinates=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    const {address}=req.query;
    try{
        const coordinates=await mapsService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    }
        catch(error)
        {
            res.status(404).json({message:'Coordinates not found'})
        }
    
}
module.exports.getDistanceTime=async (req,res)=>{
    try{
const error=validationResult(req);
if(!error.isEmpty())
{
    return res.status(400).json({
        error:error.array()
    })
}
const {origin,destination}=req.query;
console.log("Origin:", origin);
console.log("Destination:", destination);

const distanceTime=await mapsService.getDistanceTime(origin,destination);
res.status(200).json(distanceTime);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            message:'internal server error'
        })
    }
}
module.exports.getAutoCompleteSuggestions=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({error:error.array()})
    }
    try{
    const {input}=req.query;
    const suggestions=await mapsService.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
    }
    catch(error)
    {
        res.status(500).json({
            message:'Internal server error'
        })
    }
}