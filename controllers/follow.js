const User = require('../models/user')
//WORKING
const followUser = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;

    try {
        const userFollowing = await User.findById(_id);
        const userFollowed = await User.findById(id);

        if (!userFollowing || !userFollowed) {
            return res.status(404).send('User not found');
        }

        await User.findByIdAndUpdate(_id, {
            $addToSet: {
                follows: userFollowed._id,  // Directly add the ObjectId
            },
        });

        await User.findByIdAndUpdate(id, {
            $addToSet: {
                followers: _id,  // Directly add the ObjectId
            },
            $push: {
                notification: {
                    message: `${userFollowing.username} has started following you`,
                },
            },
        });

        res.status(200).send('User followed successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = followUser

//By Using the addtoset function we assure that there is

//By Using the addtoset function we assure that there is no duplicate followers or duplicate follows
