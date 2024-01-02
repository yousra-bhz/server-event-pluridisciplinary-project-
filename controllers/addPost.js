const Post = require('../models/post.js')
const addPost  = (req , res) => {
    const {date,place,organizer,link,category} = req.body;

    if(!date ||!place || !organizer || !link ||!category){
        res.json({
            status : "FAILED",
            message : "please provide all fields"
        })
    }

    const AddedPost = new Post ({
        date,
        place,
        organizer,
        link,
        category
    })
    
    AddedPost.save().then(() =>  {
        res.json({
            status : "SUCCES",
            message : "your request is sent to the admin"
        })
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