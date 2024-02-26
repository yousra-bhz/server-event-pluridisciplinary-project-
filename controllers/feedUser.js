const Post = require('../models/post');
//WORKING
const Feed = (req, res) => {
  const { preOne, preTwo, preThree } = req.user;

  // Construct a query object based on user preferences
  const query = {
    $or: [
      { category: preOne },
      { category: preTwo },
      { category: preThree },
    ],
  };

  Post.find(query , {isApprouved : true})
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = Feed;
