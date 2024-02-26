const User = require('../models/user'); // Assuming User model is correct


//NOT TESTED YET
const deleteNotification = async () => {
    try {
        const users = await User.find();
        const now = new Date();

        // Loop through every user
        for (const user of users) {
            // If notifications array is empty or undefined, skip
            if (!user.notification || user.notification.length === 0) continue;

            // Loop through every notification
            for (const notification of user.notification) {
                const creationDate = new Date(notification.date);
                const differenceInMs = now - creationDate;
                const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

                // If notification is older than or equal to 3 days, remove it
                if (differenceInDays >= 3) {
                    // Remove the notification from the array
                    user.notification.pull(notification);
                }
            }

            await user.save();
        }

        console.log('Notifications older than 3 days deleted successfully');
    } catch (error) {
        console.error('Error clearing the notifications:', error);    
    }
};

module.exports = deleteNotification;
