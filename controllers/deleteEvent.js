
const Post = require('../models/post')

//this function is used to deleted a passed event
//for upcoming events(cancel event) we use another function to cancel event
const DeleteEventByUser = async (req , res) => {
                    const {id} = req.params
                    const post = await Post.findById(id)
                    const postDate = post.date
                    const currentDate = new Date();
                    if(postDate > currentDate){
                        res.status(404).send("you can not delete this event")
                    }
                    else{
                        await Post.findByIdAndDelete(id)
                        es.status(404).send("event deleted")
                    }
            
}


module.exports = DeleteEventByUser
