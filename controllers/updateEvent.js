const Post = require('../models/post');

const updateEvent = async (req, res)=>{
    try{
        const {id} = req.params
        const { 
                newname ,
                newPlace ,
                newdate ,
                newcategory,
                newLink} = req.body

        await Post.findByIdAndUpdate(id,
            {name:newname ,
            place:newPlace ,
            date:newdate ,
            category:newcategory,
            link:newLink})

        console.log('Event updated successfully:');
        res.status(200).send('Event updated successfully!');
}
        catch(error) {
                console.error('Error updating the Event:', error);
                res.status(500).send('Error updating the Event');
             
        }


}


module.exports = updateEvent
