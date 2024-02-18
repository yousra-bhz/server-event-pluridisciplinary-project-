const User = require('../models/user');

const followUser = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;

    try {
        const userFollowing = await User.findById(_id);
        const userFollowed = await User.findById(id);

        if (!userFollowing) {
            return res.status(404).send('User not found');
        }

        if (!userFollowed) {
            return res.status(404).send('User1121 not found');
        }

        await User.findByIdAndUpdate(_id, {
            $addToSet: {
                follows: {
                    id: id,
                    username: userFollowed.username,
                    image: userFollowed.img,
                },
            },
        });

        await User.findByIdAndUpdate(id, {
            $addToSet: {
                followers: {
                    id: _id,
                    username: userFollowing.username,
                    image: userFollowing.img,
                },
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

module.exports = followUser;


//By Using the addtoset function we assure that there is

//By Using the addtoset function we assure that there is no duplicate followers or duplicate follows
