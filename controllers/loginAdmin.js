const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs="


const LoginAdmin = () => {
        const {email , password } = req.body

        if(!email ||!password) {
            res.status(500).send('please provide all fields')
        }


        Admin.findOne( {email : email}).then( (userExist) => {
                        bcrypt.compare(password, userExist.password).then((match) => {
                            res.status(200).send('admin logged in ')
                            

                            //generating a token for the admin
                            const token = jwt.sign({
                                userId: userExist._id,
                                username: userExist.username
                            }, JWTsecret);



                            return res.status(200).json({
                                status: "SUCCESS",
                                message: "Logged in successfully as Admin",
                                username: userExist.username,
                                token
                            });


                        })
                        .catch((error) => {
                            console.log(error)
                            res.status(500).send('the password does not match the email')
                        })
        })
        .catch((error) => {
            console.log(error);
            res.status(404).send('user not found')
        })
}

module.exports = LoginAdmin