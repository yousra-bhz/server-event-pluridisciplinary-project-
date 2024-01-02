const mongoose = require('mongoose');
const Post = require('../models/post')
const UserPosts = (req , res) => { 
        Post.find({organizer:req.user._id}).then((posts) => {
            res.json({posts})
        })
        .catch(err =>  console.log(err))
}

module.exports = UserPosts