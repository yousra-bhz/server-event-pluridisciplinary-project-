const Post = require('../models/post');
const User = require('../models/user');

const updateEvent = async (req, res) => {
try {
        const { id } = req.params;
        const { title, place, date, link } = req.body;

        const post = await Post.findById(id);
        let interestedUsers = [];

        if (post && post.interested) {
        interestedUsers = post.interested;
        
        } else {
        console.log('Post or Interested is undefined:', post);
        }
        await Post.findByIdAndUpdate(id, {
        title,
        place,
        date,
        link,
        });

        // Update notification for each interested user
        for (const userId of interestedUsers) {
        const user = await User.findById(userId);

        if (user) {
                user.notification.push({
                Date: Date.now(),
                message: 'this event is updated',
                });

                // Save the changes to the user
                await user.save();
        } else {
                console.log('User not found with ID:', userId);
        }
        }

        console.log('Event updated successfully');
        res.status(200).send('Event updated successfully!');
} catch (error) {
        console.error('Error updating the Event:', error);
        res.status(500).send('Error updating the Event');
}
};

module.exports = updateEvent;
