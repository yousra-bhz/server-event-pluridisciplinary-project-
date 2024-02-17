const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;


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
    preOne : {
        type : String,
    },
    preTwo : {
        type : String,
    },
    preThree : {
        type : String,
    },
    warnings:{
        type :Number,
        default:0
    },
    phoneNumber:{
        type:String,
        default:"",
        required:false
    },
    likedEvents:[ 
        {
        type: ObjectId,
        ref:'Post'
    },
    ],
    follows:[
        {
            id:ObjectId,
        }
    ],
    followers:[
        {
            id:ObjectId,
        }
    ],
    notification:[
        {   
            date : Date,
            message:String,
            image:String
        }
    ]
})

module.exports = mongoose.model("User" , UserSchema)