const Post = require('../models/post')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const Interested = async(req,res) => {
    const {_id , username , email} = req.user
    const {id} = req.params

    await Post.findByIdAndUpdate(id , {
        $addToSet : {
            interested : _id
        }
    }).then(() => {
        
        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "mailegen",
                link: "https://mailgen.js/"
            }
        });

        // Generate email content
        const Email = {
            body: {
                name: username,
                intro: "Hello, by Clicking the button interested you will be notified about any change or update on this event.",
                outro: "Need help? Just reply to this email."
            }
        };

        const emailBody = mailGenerator.generate(Email);

        // Email configuration
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "brandt22@ethereal.email",
                pass: "Sw4zVJPRah4f3j5MzQ",
            }
        });

        // Message details
        const message = {
            from: "brandt22@ethereal.email",
            to: email,
            subject: "Disclaimer",
            html: emailBody
        };

        // Send email
        transporter.sendMail(message)

        res.status(200).send('you will be notified whenever this event will be modified')
    } )
}

module.exports = Interested