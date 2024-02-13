const Post = require('../models/post');
const User = require('../models/user');

const DisLike = async(req , res) => {
    const {userId} = req.user;
    const {eventId} = req.params;

    Post.findByIdAndUpdate(eventId , {
        $inc : {likes : -1}
    }).then(() => {
        User.findByIdAndUpdate(userId , {
            $pull :{likedEvents :eventId}
        }).then(() => {
            res.status(200).send('this event is disliked and removed from your liked events')
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

module.exports = DisLike