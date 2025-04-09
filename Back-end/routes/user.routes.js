const express=require('express');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const userController=require('../controllers/user.controller')
const authMiddleware=require('../middleware/auth.middlewares')
const blacklistTokenModel=require('../models/blacklistToken.model')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage("First Name Invalid"),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters')
],userController.registerUser)
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password Invalid')
],userController.loginUser)



router.get('/profile',authMiddleware.authUser,userController.getUserProfile)


// In JavaScript (especially in Node.js), module.exports is an object that is used to export functionality from a module so that it can be imported and used in other parts of the application.

// When you write module.exports.somevariable, you're attaching a property named somevariable to the module.exports object, making it available for other modules that import this one.

// Here's a breakdown:
// module.exports is an object that defines what will be exported from the module.
// somevariable is just a property that you're assigning to module.exports. It can hold any value — a function, a string, an object, an array, etc.
router.get('/logout',userController.logoutUser);

module.exports=router;