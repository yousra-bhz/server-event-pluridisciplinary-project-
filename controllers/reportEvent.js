const Post = require('../models/post')
const Admin = require('../models/admin')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const RepportPost = (req , res) => {

    //find the post
    //add a report to this event
    //send email to the person who reported to confirm that his report was send succesfully to the admin
    //const {email , username} = req.user
    const {id} = req.params
    const {reason} = req.body

    Admin.findByIdAndUpdate({_id : "65dad6407231d4b7feb9b8ba"} , {
        $push : {
            reports :{
                event : id,
                reason : reason,
                date : Date.now()
            }
        }
    }).then(() => {
        console.log("event repported succesfully")
        res.status(200).send('your report will be processed')
    })
    .catch((err) => console.log(err))

}

module.exports = RepportPost