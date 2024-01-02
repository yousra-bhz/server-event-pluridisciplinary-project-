const Post = require('../models/post.js')
const addPost  = (req , res) => {
    const {date,place,link,category} = req.body;

    if(!date ||!place || !link ||!category){
        res.json({
            status : "FAILED",
            message : "please provide all fields"
        })
    }

    const AddedPost = new Post ({
        date,
        place,
        link,
        category,
        organizer:req.user
    })
    AddedPost.save().then(() =>  {
        res.json({AddedPost})
        
    })
        .catch((error) => {
            console.log(error);
            res.json({
                status : "FAILED",
                message : "we could not send the request to the admin"
            })
        })

}


module.exports = addPost