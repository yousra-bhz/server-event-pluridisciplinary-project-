const jwt = require('jsonwebtoken');
const JWT_SECRET = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs=";
const mongoose = require('mongoose')
const User = require('../models/user')
const Auth = (req , res , next) => {
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).send('you musb be logged in')
    }
    const token = authorization.replace("Baerer " , "");
    jwt.verify(token , JWT_SECRET  , (err,payload) =>{
        if(err) {
            res.status(401).send('you musb be logged in')
        }
        else{
            const {_id} = payload;
            User.findById(_id).then((userdata) =>{
                        req.user = userdata;
            })
            next()
        }
    })
}

module.exports = Auth