const User = require('../models/user')
const GetUsers = async(req , res) => {
        const users = await User.find();
        res.json({users})
}

module.exports =  GetUsers