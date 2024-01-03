const mongoose = require('mongoose');
const Post = require('../models/post')
const DeleteEvent = (req , res) => {
        const {postId} = req.params;
        Post.findByIdAndDelete(postId)

}

module.exports = DeleteEvent