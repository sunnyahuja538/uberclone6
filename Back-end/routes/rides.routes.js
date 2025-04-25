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
router.post('/confirm',
    body('rideId').isMongoId().withMessage('invalid ride id'),
    authmiddleware.authCaptain,
    rideController.confirmRide
);
router.get('/start-ride',query('rideId').isMongoId().withMessage('Invalid rideId'),
query('otp').isString().isLength({min:6,max:6}),authmiddleware.authCaptain,
rideController.startRide)
router.post('/end-ride',
    body('rideId').isMongoId(),
    authmiddleware.authCaptain,
    rideController.endRide
)
module.exports=router;