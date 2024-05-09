const Post = require('../models/post')


const EventPassed  = async(req , res , next) => {
    try{
        const {id} = req.params
        const post = await Post.findById(id)
        const date = post.date
        const current = new Date();
        if(date <  current){
            next()
        }
        else {
            res.status(404).send("you can not perform this operation")
        }
    }
    catch(error){
        console.log(error)
    }
           
}

module.exports = EventPassed