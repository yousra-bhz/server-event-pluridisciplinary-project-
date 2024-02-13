const User = require('../models/user');

const followUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const UserFollowing = await User.findById(_id);
    const UserFollowed = await User.findById(id);

    if (!UserFollowing ) {
      return res.status(404).send('User not found');
    }

    if (!UserFollowed ) {
        return res.status(404).send('User1121 not found');
      }

    await User.findByIdAndUpdate(_id, {
      $push: {
        follows: {
          username: UserFollowed.username,
          image: UserFollowed.img,
        },
      },
    });

    await User.findByIdAndUpdate(id, {
      $push: {
        followers: {
          username: UserFollowing.username,
          image: UserFollowing.img,
        },
        notification: {
          image: UserFollowing.img,
          message: `${UserFollowing.username} has started following you`,
        },
      },
    });

    res.status(200).send('User followed successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = followUser;
