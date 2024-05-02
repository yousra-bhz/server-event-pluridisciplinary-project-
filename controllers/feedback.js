const Post = require('../models/post')
const User = require('../models/user')


//WORKING



const sendFeedback = async (req,res)=>{
    try{
        const {_id} = req.user; //this is the uder id
        const user = await User.findById(_id)
        const {message} = req.body;
        const { id }= req.params // this is the event id
        Post.findByIdAndUpdate(
            id,
            {
                $push: { feedbacks: { 
                    date : Date.now(),
                    user : user,
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
