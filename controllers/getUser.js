const mongoose = require('mongoose');
const User = require('../models/user')
const getUser = async(req , res) =>{
    const {username} = req.params 
    try{
    if(!username){
        return res.status(501).send({error : "invalid user name"})
    }
    else{
        User.findOne({username}).then((userExist) =>{
            if(userExist){
                // const {password, ...rest } = Object.assign({} , userExist.toJSON())
                return res.status(201).send(userExist)
            }
        else {
            return res.status(501).send({error : 'username does no exist in the database' })
        }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    }
    catch(error){
    return res.status(404).send({error : "cannor find user"})
    }
}

module.exports = getUser