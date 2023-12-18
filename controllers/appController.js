import isEmail from 'validator/lib/isEmail';

const User = require('../models/user');
const validator = require('validator');
export async function register(req , res) {
    const  { username ,email ,password , confirmpassword} = req.body;
    //check the existance of the user 
    if (!email || !username || !password ||!confirmpassword){
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
    else if (password !== confirmpassword){
        res.json({
            status : "FAILED",
            message : "the confirmpassword is not matching "
        });
    } 

    User.findOne({email}).then((userexist) => {
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

export async function login(req , res) {
    
}

export async function getUser(req , res) {
    
}


export async function updateUser(req , res) {
    
}


export async function generateOTP(req , res) {
    
}


export async function verifyOTP(req , res) {
    
}


export async function createResetSession(req , res) {
    
}


export async function resetPassword(req , res) {
    
}

