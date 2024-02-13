const Post = require('../models/post')
const Getposts = async(req , res) => {
       Post.find().populate("organizer").then((posts) => {
        res.json({posts})
       })
       .catch((error) => console.log(error))
}

module.exports =  Getposts