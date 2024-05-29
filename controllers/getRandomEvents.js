const Post = require('../models/post')

const RandomPosts = async(req , res) => {
    try{
        let  posts = await Post.find()
         posts = posts.slice(0, 20)
        res.json({posts})

    }
    catch (error) {
        console.log(error)
    }
        
}

module.exports = RandomPosts