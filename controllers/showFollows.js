const User = require('../models/user');

const showFollows = async(req , res) => {
        const {userId} = req.user;
        await User.findById(userId).then((userFound) => {
                const follows = userFound.follows;
                res.status(200).send({
                    message : 'these are the accounts that you are following',
                    follows
                })
        })
        .catch((error) => res.status(404).send('we can not show the accounts that you are following'))

}

module.exports = showFollows