const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const User = require('../models/user');
const admin = require('../models/admin');
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs=";

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

    Admin.findOne({ email })
        .then((adminexist) => {
            bcrypt.compare(adminexist.password, password)
                .then((match) => {
                    if (match) {
                        const token = jwt.sign({
                            userId: adminexist._id,
                            username: adminexist.username
                        }, JWTsecret);
                        res.status(200).send('admin logged in successfully')
                        return res.status(200).json({
                            status: "SUCCESS",
                            message: "Logged in successfully",
                            username: adminexist.username,
                            token
                        });
                    } else {
                        console.log(error);
                        res.status(500).send('admin cannot log in, incorrect password ')
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send('admin cannot log in, incorrect password ')
                })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send('we cannot find the admin email, please try another email')
        })

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
                            const { usersconnected } = admin
                            const token = jwt.sign({
                                userId: userExist._id,
                                username: userExist.username
                            }, JWTsecret);

                            // inc users in the platform
                            usersconnected++
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
