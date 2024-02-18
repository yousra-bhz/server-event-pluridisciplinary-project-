const Post = require('../models/post')



const sendFeedback = async (req,res)=>{
    try{
        const {username , msg , eventId}=req.params
        Post.findByIdAndUpdate(
            eventId,
            {
                $push: { feedbacks: { 
                    username: username,
                    message:msg 
                }
            }
        })
        console.log('feedback added successfully:', newname);
        res.status(200).send('feedback added successfully');


    }catch(error){
        console.error('Error updating the Event:', error);
        res.status(500).send('Error updating the Event');
     

    }
}


module.exports = sendFeedback
