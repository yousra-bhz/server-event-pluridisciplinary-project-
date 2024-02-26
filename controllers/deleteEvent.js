const Post = require('../models/post')

//this function is used to deleted a passed event
//for upcoming events(cancel event) we use another function to cancel event
const DeleteEventByUser = async (req , res) => {
              const {id} = req.params

              await Post.findByIdAndDelete(id).then(() => res.status(200).send('event deleted succesfully'))
              .catch((err) => console.log(err))
}


module.exports = DeleteEventByUser
