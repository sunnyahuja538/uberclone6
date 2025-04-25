const mongoose=require('mongoose');


const rideSchema=new mongoose.Schema({//ride schema is an object of mongoose Schema class
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',//The ref property is used to create relationships between MongoDB collections, similar to how foreign keys work in relational databases.
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captain'
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending',
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    paymentID:{
        type:String,
    },
    orderID:{
        type:String
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,//we dont need to send it to the driver
        required:true
    }
})
const rideModel=mongoose.model('ride',rideSchema);
module.exports=rideModel//type of a model is an object
// Mongoose Model vs. Collection vs. ref – Summary
// 🔹 mongoose.model('User', userSchema)
// 'User' is the model name (case-sensitive).

// This is used in your code and in ref.

// Mongoose automatically creates a collection named 'users' (lowercased + pluralized).

// 🔹 ref: 'User'
// ref must match the model name exactly ('User'), not the collection name.

// It allows Mongoose to look up the related document using that model.

// 🔹 Never write:
// js
// Copy code
// ref: 'users' ❌  // This will NOT work
// 🧠 Rule of Thumb:
// Always use the model name (first argument to mongoose.model()) in your ref.

