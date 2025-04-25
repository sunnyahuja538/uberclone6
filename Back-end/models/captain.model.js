const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const captainSchema=new mongoose.Schema({
    fullname:{
    firstname:{type:String,
    required:true,
    minlength:[3,'Firstname must be atleast 3 characters long']
    },
    lastname:{
        type:String,
        required:true,
        minlength:[3,'Lastname must be 3 characters long atleast']
    }
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true,
    select:false
},
socketId:{
    type:String
},
status:{
    type:String,
    enum:['active','inactive'],
    default:'active'
},
vehicle:{
    color:{
        type:String,
        required:true,
        minlength:[3,'color must be  at least 3 characters long']
    },
    plate:{
        type:String,
        required:true,
        minlength:[3,'Plate must be at least 3 characters long']
    },
    capacity:{
        type:Number,
        required:true,
        min:[1,'capacity must be 1 at least']
    },
    vehicleType:{
        type:String,
        required:true,
        enum:['car','bike','auto']
    }
},
location:{
    ltd:{
        type:Number
    },
    lng:{
        type:Number
    }
}
});
captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
captainSchema.methods.comparePassword=function(password)
{
    const match=bcrypt.compare(password,this.password);
    return match;
}
captainSchema.statics.hashPassword=function(password)
{
    const hashedPassword=bcrypt.hash(password,10);
    return hashedPassword;
}
const captainModel=mongoose.model("captain",captainSchema);
module.exports=captainModel;