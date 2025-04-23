const express=require('express');
const router=express.Router();
const {body, query}=require('express-validator');
const rideController=require('../controllers/rides.controller');
const authmiddleware=require('../middleware/auth.middlewares')
router.post('/create',
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','bike']).withMessage('Invalid user id'),
    authmiddleware.authUser,
    rideController.createRide
)
router.get('/get-fare',authmiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
    rideController.getFare

)
module.exports=router;