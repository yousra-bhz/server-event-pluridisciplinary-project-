const mongoose = require('mongoose');

const AdminModel = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        default: "Admin"
    },
        email : {
                type : String,
                required : true,
                default: "bouhrizdaidjyousra@gmail.com"
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
        

        usersConnected : {
            type : Number,
            default :0
        },

})


module.exports = mongoose.model('Admin' , AdminModel)