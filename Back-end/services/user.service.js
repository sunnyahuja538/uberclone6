const userModel=require('../models/user-model')


// The throw new Error() line is typically used to validate input before you attempt to save the document to the database. 
// For instance, before calling userModel.create() or user.save(), you might want to ensure that the required fields are not undefined or null in your function before passing them into Mongoose's model methods.

// By writing this explicit validation, you're catching errors earlier — typically before the document even reaches Mongoose's internal validation mechanism. This can be helpful for providing custom error 
// messages or handling input validation differently from Mongoose's built-in validation.

module.exports.createUser=async({//pass parameters as a object
    firstname,lastname,email,password
})=>{
    if(!firstname||!email||!password)
    {
        throw new Error("All fields are required")
    }
    const user= userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}