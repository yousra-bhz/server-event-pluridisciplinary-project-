const Admin = require('../models/admin')
const bcrypt = require('bcrypt')

const LoginAdmin = () => {
        const {email , password } = req.body

        if(!email ||!password) {
            res.status(500).send('please provide all fields')
        }


        Admin.findOne( {email : email}).then( (userExist) => {
                        bcrypt.compare(password, userExist.password).then((match) => {
                            res.status(200).send('admin logged in ')
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