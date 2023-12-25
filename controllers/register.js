const User = require('../models/user.js')
const validator = require('validator')
const mongoose = require('mongoose')
const register = async(req , res) => {
    const  { username ,email ,password } = req.body;
    //check the existance of the user 
    if (!email || !username || !password ){
        //one or more thant one field is missing
        res.json({
            status : "FAILED",
            message : "one of the fields is missing"
        });
        }
    else if(!validator.isEmail(email)) {
        res.json({
            status : "FAILED",
            message : "the email does not have the appropriate format"
        });
    }
    else if( !validator.isStrongPassword(password)){
        res.json({
            status : "FAILED",
            message : "the password is not strong "
        });
    }
    await  User.findOne({email : email}).then((userexist) => {
        if(userexist){
            res.json({
                status : "FAILED",
                message : "the email exists already"
            });
        }
        //if the user does not exist we create it and we save it in the database
        else{
            const newUser = new User ({
                email , 
                username,
                password
            })
        newUser.save().then(() => {
            res.json(
                {
                    status : "Succes",
                    message : "user saved succesfully"
                }
            )
        })
        .catch((error) => {
                console.log(error , "an error has occured when trying to save the user")
        })

        }
    })
    .catch((error) => {
        console.log('an error has occured while trying to find the email' , error)
    })
}

 module.exports = register           