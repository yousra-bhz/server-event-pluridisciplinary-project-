const Post = require('../models/post')
const Getposts = async(req , res) => {
        const posts = await Post.find();
        res.json({posts})
}

module.exports =  Getposts