const bcrypt = require('bcrypt')
const Admin = require('../models/admin')

const RegisterUser = async() => {
    const {username , password , email} = req.body

    if (!username || !password ||! email) {
        res.status(500).send('please provide all fields')
    }
    

    const hashedPass = await bcrypt.hash(password , 10).then(() => {
        const admin = new Admin ({
            username,
            email,
            password: hashedPass
        }).then(() => admin.save().then(() => res.status(200).send('admin registered succesfully'))
        .catch((error) => {
            console.log(error)
            res.status(500).send('we can not save this user')
        })
        
        )
    })
    .catch((error) => {
        console.log(error)
        res.status(501).send('we can not create this user')
    })
    


}

module.exports = RegisterUser