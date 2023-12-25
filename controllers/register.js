const mongoose = require('mongoose');
const validator = require('validator')
const User = require('../models/user.js');
const bcrypt= require('bcrypt')
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
    await  User.findOne({email}).then((userexist) => {
        if(userexist){
            res.json({
                status : "FAILED",
                message : "the email exists already"
            });
        }
        //if the user does not exist we create it and we save it in the database
        else{
            bcrypt.hash(password , 10).then((hashedpass) => {
                if(!hashedpass){
                    res.json('error while trying to hash the password')
                }
                else{
                    const newUser = new User ({
                        email , 
                        username,
                        password : hashedpass
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
                    if (error.code === 11000 && error.keyPattern && error.keyValue) {
                        const fieldName = Object.keys(error.keyPattern)[0];
                        const duplicateValue = error.keyValue[fieldName];
                        res.status(400).json({ message: `Duplicate key error: ${fieldName} '${duplicateValue}' already exists.` });
                      } else {
                        // Handle other errors
                        console.error('An error occurred when trying to save the user:', error);
                        res.status(500).json({ message: 'Internal server error' });
                      }
                })
                }
            })
            

        }
    })
    .catch((error) => {
        console.log('an error has occured while trying to find the email' , error)
    })
}

 module.exports = register           