const User = require('../models/user');

const UnfollowUser = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    console.log(req.params)
    console.log(req.user)

    try {
        const userFollowing = await User.findById(_id);
        const userFollowed = await User.findById(id);

        if (!userFollowing ) {
            return res.status(404).send('User not found');
        }

        if (!userFollowed) {
            return res.status(404).send('User not not found');
        }


        userFollowing.follows = userFollowing.follows.filter(follow => follow.username !== userFollowed.username);
        userFollowed.followers = userFollowed.followers.filter(follower => follower.username !== userFollowing.username);

        await userFollowing.save();
        await userFollowed.save();

        await User.findByIdAndUpdate(id, {
            $push: {
                notification: {
                    image: userFollowing.img,
                    message: `${userFollowing.username} has unfollowed you`,
                },
            },
        });

        res.status(200).send('User unfollowed successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = UnfollowUser;
