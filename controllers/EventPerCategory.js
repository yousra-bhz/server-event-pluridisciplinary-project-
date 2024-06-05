const Post = require('../models/post')

const EventPerCategory = async(req , res) => {
    const {category} = req.body;
    Post.find({category : category , isApprouved : "Approuved"}).then(() => {
        res.json({posts})
    })
    .catch( (err) => {
        console.log(err)
        res.status(401).send('this page is not found')
    } )

}

module.exports  = EventPerCategory;