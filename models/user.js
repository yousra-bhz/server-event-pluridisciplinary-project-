const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "please provide unique Username"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "please provide a unique email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        unique: false
    },
    preOne: {
        type: String,
    },
    preTwo: {
        type: String,
    },
    preThree: {
        type: String,
    },
    preFour: {
        type: String,
    },
    preFive: {
        type: String,
    },
    preSix: {
        type: String,
    },
    warnings: {
        type: Number,
        default: 0
    },
    phoneNumber: {
        type: String,
        default: "",
        required: false
    },
    likedEvents: [
        {
            type: ObjectId,
            ref: 'Post'
        },
    ],
    follows: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    notificationUser: [
        {
            user: {
                type: ObjectId,
                ref: 'User'
            },
            date: {
                type: Date
            },
            message: {
                type: String
            }
        }
    ],
    notificationEvent: [
        {
            event: {
                type: ObjectId,
                ref: 'Post'
            },
            date: {
                type: Date
            },
            message: {
                type: String
            }
        }
    ],
    image: {
        type: String,
        required: false,
    },
    OTPcode : {
        type : String,
        required : false,
        default : null
    },
    OTPverfied : {
        type : Boolean,
        default: false
        
    }
});

module.exports = mongoose.model("User", UserSchema);
