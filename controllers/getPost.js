const mongoose = require('mongoose');
const Post = require('../models/post')
//WORKING

const getEvent = (req , res) => {
    const {postId} = req.params;
    Post.findById(postId).then((foundPost) => {
        if(!foundPost){
            res.status(401).send('post not found')
        }
        else{
            res.json(foundPost)
        }
    })
    .catch(err => console.log(err))
}

module.exports = getEvent