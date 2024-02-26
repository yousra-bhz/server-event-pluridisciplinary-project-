const Post = require('../models/post.js');
const Admin = require('../models/admin.js')
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

//WORKING

const addPost = (req, res) => {
    const { title ,date, place, link, category , localisation } = req.body;
    

    if (!date || !place || !link || !category || !title ||!req.user ||!localisation) {
        return res.json({
            status: "FAILED",
            message: "Please provide all fields"
        });
    }

    const AddedPost = new Post({
        date,
        place,
        link,
        category,
        title,
        localisation,
        organizer: req.user
    });

    AddedPost.save()
        .then(() => {
            const { email, username } = req.user;

            // Create mail generator instance
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
                    intro: "Hello, your request will be treated. Please wait for the confirmation of your event by the admin.",
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
                subject: "Event Confirmation",
                html: emailBody
            };

            // Send email
            transporter.sendMail(message)
                .then(() => res.status(200).send({ msg: "You should receive an email from us" }))
                .catch((error) => {
                    console.error(error);
                    res.json({
                        status: "FAILED",
                        message: "We could not send the request to the admin"
                    });
                });
        })
        .catch((error) => {
            console.error(error);
            res.json({
                status: "FAILED",
                message: "We could not send the request to the admin"
            });
        });
};

module.exports = addPost;
