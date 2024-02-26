const Post = require('../models/post');
const User = require('../models/user');

//WORKING

const LikeEvent = async(req , res) => {
    const {_id , username} = req.user;
    const {id} = req.params;


    Post.findByIdAndUpdate(id , {
        $inc : {likes : 1}
    }).then(() => {
        console.log(Event);
        User.findByIdAndUpdate(_id , {
            $addToSet :{likedEvents :id}
        }).then(() => {
            res.status(200).send('this event is liked and added to your liked events')

        })
        .catch((error) => {
            console.log(error);
            res.status(404).send('we can not find the user')
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(404).sned('we can not find this event')
    })
    
}

//we send a notiifcation to the organizer of the event that indicates that his event has been liked 

module.exports = LikeEvent
