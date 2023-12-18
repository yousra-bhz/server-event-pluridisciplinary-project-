const mongoose = require('mongoose');
const URL = 'mongodb+srv://yousrabouhrizdaidj:9hsrOj2un1k3KTa0@cluster0.6gzqz41.mongodb.net/mernsatck?retryWrites=true&w=majority'
const ConnectToDb =  () => {
        try{
            mongoose.connect(URL)
            console.log("succes")
        }
        catch(error){
        console.log(error)
        }
}

module.exports = ConnectToDb