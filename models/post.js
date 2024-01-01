const mongoose = require('mongoose');

const PostModel = new mongoose.Schema({
    date : {
        type : Date,
        required : [true , "please provide a unique email"],
        unique : true
    },
    place : {
        type : String,
        required : [true , "please provide a password"],
        unique : false
    },
    organizer : {
        type : String,
        required : [true , "please provide a password"],
        unique : false
    },
    isApprouved : {
        type : Boolean,
        default :false
    },
    likes : {
        type : Number,
        default :0
    },
    link : {
        type : String,
        required : [true , "this link will redirect you to the form "],
    }

})



module.exports = mongoose.model("Post" , PostModel )