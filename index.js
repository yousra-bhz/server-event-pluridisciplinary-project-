const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const app = express();
const ConnectToDb = require('./config/connectTodb');
const route = require('./routes/route');
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api' , route)
app.listen(5000 , () =>{
    console.log('you are runing the server on port 5000');
    ConnectToDb();
    console.log('hey')
})