const mongoose = require('mongoose');
const User = require('../models/user');

//we can update user only after validating this user this is why we are calling the auth function to verify if the user is validate or not
//auth function :
//after the user is registered and after the user is loged in we are generating a token (string)
//we copare this token to the jwt.secret if the signature of the token is valid so the user is valid and then we take info from this troken and we use it in updatefunction like the ID
const updateUser = async(req , res) =>{
    try{
        const {userId} = req.user
        if (userId) {
            const body = req.body;
            User.updateOne({_id :userId} , body)
            res.status(201).send('user updated')
        }
    }
    catch(error){
    res.status(404).send({ error : 'an error has occured'})
    }
}

module.exports = updateUser