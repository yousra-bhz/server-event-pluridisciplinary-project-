const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user')
const resetPassword = async(req , res) =>{
    if(!res.app.locals.nexSession) return res.status(404).send({error : "session expired"})
    
    const {email ,password} = req.body;
            await User.findOne({email}).then((userExist) => {
            if(!userExist) {
                return res.status(501).send({error : 'this user is not  found in the database'})
            }
            else{
                bcrypt.hash(password , 10).then((hashedpassword) => {
                    userExist.password = hashedpassword
                    userExist.save()
                    req.app.locals.nexSession = false;
                })
                .catch((error) => {
                    return res.status(400).send({error : "we can not hash the password"})
                }) 
            }
        })
            .catch((error) =>{
                return res.status(404).send({ error : "find opperation is not executed succesfully"})
            })
    
}

module.exports = resetPassword