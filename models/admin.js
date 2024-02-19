const mongoose = require('mongoose');

const AdminModel = new mongoose.Schema({
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
        }
})


module.exports = mongoose.Model('Admin' , AdminModel)