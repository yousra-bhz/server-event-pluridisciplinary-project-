const User = require('../models/user');
//WORKING
const UnfollowUser = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;

    try {
        const userUnfollowing = await User.findById(_id);
        const userUnfollowed = await User.findById(id);

        if (!userUnfollowing) {
            return res.status(404).send('User not found');
        }

        if (!userUnfollowed) {
            return res.status(404).send('User not found');
        }

        // Remove the userUnfollowed from the follows array of userUnfollowing
        await User.findByIdAndUpdate(_id, {
            $pull: { follows: userUnfollowed._id }
        });

        // Remove the userUnfollowing from the followers array of userUnfollowed
        await User.findByIdAndUpdate(userUnfollowed._id, {
            $pull: { followers: _id }
        });

        await User.findByIdAndUpdate(id, {
            $push: {
                notification: {
                    image: userUnfollowing.image,
                    message: `${userUnfollowing.username} has unfollowed you`,
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
