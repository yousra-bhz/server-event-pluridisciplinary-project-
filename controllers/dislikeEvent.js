const Post = require('../models/post');
const User = require('../models/user');

const DisLike = async (req, res) => {
    try {
        const { _id } = req.user;
        const { id } = req.params;

        await Post.findByIdAndUpdate(id, {
            $inc: { likes: -1 }
        });

        await User.findByIdAndUpdate(_id, {
            $pull: { likedEvents: id }
        });

        res.status(200).send('This event is disliked and removed from your liked events');
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError') {
            res.status(404).send('Invalid event ID');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = DisLike;
