const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({


    //It will consist of two objects:-
    //1.firstname
    //2.lastname
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"minimum length of firstname is 3"]
        },
        lastname:{
            type:String,
            minlength:[3,"minimum length of lastname is 3"]
        } 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"email must be 3 atleast"]
    },
    password:{
        type:String,
        required:true,

        //when we find user this field will not go
        select:false
    },


    //socketId will be used to get the live location later
    socketId:{
         type:String
    }
})

//methods are defined on instances of a class and statics are defined on class itself
userSchema.methods.generateAuthToken=function (){

    //payload,jwtsecretkey
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}
userSchema.methods.comparePassword=async function (password)
{
    return await bcrypt.compare(password,this.password);//returns true or false
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;