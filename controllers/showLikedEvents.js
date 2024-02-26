const User = require('../models/user');
//WORKING
const showLikedEvents = async(req , res) => {
        const {userId} = req.user;
        await User.findById(userId).then((userFound) => {
                const likedEvents = userFound.likedEvents;
                res.status(200).send({
                    message : 'these are your liked events',
                    likedEvents
                })
        })
        .catch((error) => res.status(404).send('we can not show your liked events'))

}

module.exports = showLikedEvents