const Post = require('../models/post');
const User = require('../models/user');

const DeleteEvent = async (req, res) => {
    try {

        const url = 'mongodb://127.0.0.1:27017/your_database_name';
        const dbName = 'your_database_name';
        const collectionName = 'users';
        const { id } = req.params;
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

          // Remove the event from each user's likedEvents arr

        collection.find().forEach((document) => {
            // Faites quelque chose avec chaque document
            document.likedEvents.filter((event) => event.id !== id)
            
          });

      

        // Delete the event from the Post collection
        await Post.findByIdAndDelete(id);

        res.status(200).send('Event deleted successfully from the database');
    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to delete the event from the database');
    }
};

module.exports = DeleteEvent;
