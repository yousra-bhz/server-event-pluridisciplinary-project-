const User = require('../models/user');
//WORKING
const showFollowers = async(req , res) => {
        const {userId} = req.user;
        await User.findById(userId).then((userFound) => {
                const followers = userFound.followers;
                res.status(200).send({
                    message : 'these are the accounts that are following you',
                    followers
                })
        })
        .catch((error) => res.status(404).send('we can not show the accounts that are following you'))

}

module.exports = showFollowers