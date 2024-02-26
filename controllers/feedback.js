const Post = require('../models/post')


//WORKING



const sendFeedback = async (req,res)=>{
    try{
        const {username} = req.user;
        const {message} = req.body;
        const { id }= req.params
        Post.findByIdAndUpdate(
            id,
            {
                $push: { feedbacks: { 
                    username: username,
                    message:message 
                }
            }
        }).then(() => {
            console.log('feedback added successfully:');
            res.status(200).send('feedback added successfully');
        })
        .catch((err) => console.log(err))
        


    }catch(error){
        console.error('Error updating the Event:', error);
        res.status(500).send('Error updating the Event');
     

    }
}


module.exports = sendFeedback
