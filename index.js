const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const route = require('./routes/route');
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


const ConncettoDb = () =>{
    try{
        mongoose.connect("mongodb+srv://yousrabouhrizdaidj:OLlm1241HMYMbjvP@cluster0.6gzqz41.mongodb.net/?retryWrites=true&w=majority");
        console.log('you are connected to the database')
    }
    catch{
        console.log('error')
    }
     
}
app.listen(8000 , () =>{
    console.log('hey');
    ConncettoDb()
})
app.use('/api' , route);