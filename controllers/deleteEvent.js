
const Post = require('../models/post')

// This function is used to delete an event.
// For canceling upcoming events, use another function.
const DeleteEventByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Post.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).send('Event not found');
        }
        return res.status(200).send('Event deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = DeleteEventByUser;
