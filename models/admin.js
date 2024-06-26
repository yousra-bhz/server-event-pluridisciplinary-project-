const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const AdminModel = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        default: "Admin"
    },
        email : {
                type : String,
                required : true,
                default: "yousra@gmail.com"
        },

        password : {
            type : String,
            required: true,
            default : "XXXX"
        },

        eventsPerDay : {
            type : Number,
            default : 0
        },

        eventsPerMonth : {
            type : Number,
            default : 0
        },

        eventsPerYear : {
            type : Number,
            default :0
        },

        usersRegistered : {
            type : Number,
            default :0
        },
        reports:[
                {
                    event:{
                        type:ObjectId,
                        ref:'Post'
                    },
                    reason:String,
                    date : Date,
                }    
            ],
        
        Helps:[
            {
                email :String,
                paragraph : String,
                date:Date,
            }
        ]

        
})


module.exports = mongoose.model('Admin' , AdminModel)