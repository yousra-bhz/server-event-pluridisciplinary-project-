const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/user')
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs=";
//WORKING


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            status: "FAILED",
            error: "You have to provide all fields"
        });
    } else if (!validator.isEmail(email)) {
        return res.json({
            status: "FAILED",
            error: "Invalid email format"
        });
    }

    if (email === "admin@gmail.com"){
        if(password === "Admin"){
            console.log("this is the account of the admin");
            return res.status(200).send('admin logged in succefully');
        }
        else {
            return res.status(501).send('it is not the right password for the admin ');
        }
    }

    User.findOne({ email })
        .then((userExist) => {
            if (!userExist) {
                return res.json({
                    status: "FAILED",
                    error: "This user does not exist. Do you want to register?"
                });
            } else {
                    bcrypt.compare(password, userExist.password)
                    .then((passmatch) => {
                        if (!passmatch) {
                            return res.json({
                                status: "FAILED",
                                error: "The password does not match this email"
                            });
                        } else {
                            const token = jwt.sign({
                                userId: userExist._id,
                                username: userExist.username
                            }, JWTsecret);

                            return res.status(200).json({
                                status: "SUCCESS",
                                message: "Logged in successfully",
                                username: userExist.username,
                                token
                            });
                        }
                    })
                    .catch((error) => {
                        return res.json({
                            status: "FAILED",
                            error: "Error comparing passwords"
                        });
                    });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.json({
                status: "FAILED",
                error: "Error finding user"
            });
        });
};

module.exports = login;
