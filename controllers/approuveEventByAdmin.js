const mongoose = require('mongoose');
const Post = require('../models/post')
const ApprouveEvent = (req , res) => {
        const {eventId} = req.params;
        Post.findOne({eventId}).then((foundEvent) => {
            foundEvent.isApprouved = true
            console.log(foundEvent)
            res.json({foundEvent})
        })
        .catch(err => console.log(err))

}

module.exports = ApprouveEvent