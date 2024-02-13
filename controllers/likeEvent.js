const Post = require('../models/post');
const User = require('../models/user');

const LikeEvent = async(req , res) => {
    const {userId} = req.user;
    const {eventId} = req.params;
    const Event = await Post.findById(eventId);
    let NotifiedPerson = '';
    if(Event){
         NotifiedPerson = Event.organizer;
    }
    
    const ActionPerson = await User.findById(userId)

    Post.findByIdAndUpdate(eventId , {
        $inc : {likes : 1}
    }).then(() => {
        console.log(Event);
        User.findByIdAndUpdate(userId , {
            $addToSet :{likedEvents :eventId}
        }).then(() => {
            res.status(200).send('this event is liked and added to your liked events')

            //send a notification to the org of the event
            User.findByIdAndUpdate(NotifiedPerson , {
                $push : {notification : `${ActionPerson.username} has liked your event ${eventId}`}
            })
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