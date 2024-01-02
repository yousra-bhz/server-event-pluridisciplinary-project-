const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const PostModel = new mongoose.Schema({
    date : {
        type : Date,
        required : [true , "please provide a date"],
        unique : false
    },
    place : {
        type : String,
        required : [true , "please provide the place"],
        unique : false
    },
    organizer : {
        type: String,
    },
    category :{
        type : String,
        required : [true , "please provide the category of this post"],
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