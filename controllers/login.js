const validator = require('validator');
const jwt = require('jsonwebtoken');
const ENV = require('../config')



const  login = async(req, res) =>{
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

    User.findOne({ email })
        .then((userExist) => {
            if (!userExist) {
                res.json({
                    status: "FAILED",
                    error: "This user does not exist. Do you want to register?"
                });
            } else {
                bcrypt.compare(password, userExist.password)
                    .then((passmatch) => {
                        if (!passmatch) {
                            res.json({
                                status: "FAILED",
                                error: "The password does not match this email"
                            });
                        } else {
                            res.json({
                                status: "SUCCESS",
                                message: "Logged in successfully"
                            });
                            const token = jwt.sign({
                                        userId :userExist._id,
                                        username : userExist.username
                            } , ENV.JWT_SECRET , {expireIn : "24h"});
                            return res.status(200).send({
                                msg : "yes",
                                username : userExist.username,
                                token
                            })
                        }
                    })
                    .catch((error) => {
                        res.json({
                            status: "FAILED",
                            error: "Error comparing passwords"
                        });
                    });
            }
        })
        .catch((error) => {
            res.json({
                status: "FAILED",
                error: "Error finding user"
            });
        });
}

module.exports = login