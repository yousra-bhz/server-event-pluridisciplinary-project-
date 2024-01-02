const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema ({
    username : {
        type : String,
        required : [true , "please provide unique Username"],
        unique : [true , "username exist"]
    },
    email : {
        type : String,
        required : [true , "please provide a unique email"],
        unique : true
    },
    password : {
        type : String,
        required : [true , "please provide a password"],
        unique : false
    },
    prefOne : {
        type : String,
    },
    preTwo : {
        type : String,
    },
    preThree : {
        type : String,
    },
})

module.exports = mongoose.model("User" , UserSchema)