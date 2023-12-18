const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema ({
    username : {
        type : String,
        required : [true , "please provide unique Username"],
        unique : [true , "username exist"]
    },

    password : {
        type : String,
        required : [true , "please provide a password"],
        unique : false
    },
    
    email : {
        type : String,
        required : [true , "please provide a unique email"],
        unique : true
    },
    profile : {type : String}
})

module.exports = mongoose.model("user" , UserSchema)