const Post = require('../models/post')
//WORKING
const UserPosts = (req , res) => { 
        Post.find({organizer:req.user._id , isApprouved:"Approuved"}).then((posts) => {
            res.json({posts})
        })
        .catch(err =>  console.log(err))
}

module.exports = UserPosts