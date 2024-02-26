const User = require('../models/user');
//WORKING

const showFollows = async (req, res) => {
    const { id } = req.user;

    try {
        const userFound = await User.findById(id);

        if (!userFound) {
            return res.status(404).send('User not found');
        }

        const follows = userFound.follows;
        res.status(200).send({
            message: 'These are the accounts that you are following',
            follows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = showFollows;
