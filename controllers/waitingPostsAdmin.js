const Post = require('../models/post');


const GetWaitingPost = (req , res) => {
        Post.find({isApprouved:""}).then((posts) => {
            res.status(200).send({posts})
        })
        .catch((err) => console.log(err))
}

module.exports = GetWaitingPost