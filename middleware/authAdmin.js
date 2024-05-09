const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const JWTsecret = "NQ2VDian0W9dx0OSHSXQpIGgBA1uf6KYKlYajidiKBs="
const User = require('../models/user')


const AuthAdmin  = async(req , res , next) => {
        const {_id} = req.user;
        const user = await User.findById(_id);
        if(user.isAdmin){
            next();
        }
        else {
            res.status(500).send(" you must be an admin to perform this opearation")
        }

}

module.exports = AuthAdmin