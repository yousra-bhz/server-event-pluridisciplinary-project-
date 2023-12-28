const mongoose = require('mongoose');
const User = require('../models/user')
const verifyUser = (req, res ,next) => {
    try{
    const {username} = req.method == "GET" ? req.query : req.body;
    let exist = User.findOne({username});
    if(!exist){res.status(404).send('this user does not exist')}
    next()
    }
    catch(error){
        res.status(404).send({error : "verificaion failed"})
    }
}

module.exports = verifyUser