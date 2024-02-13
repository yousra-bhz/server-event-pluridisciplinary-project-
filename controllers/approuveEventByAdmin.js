const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const Post = require('../models/post');
const User = require('../models/user'); // Import User model

const newEvent = async (organizer, event) => {
    try {
        // Loop through follows and update their notifications
        organizer.follows.forEach(async (follower) => {
            await User.findByIdAndUpdate(follower.id, {
                $push: { notifications: `${organizer.username} has posted a new event ${event.name}` }
            });
        });
    } catch (error) {
        console.error('Error updating notifications:', error);
    }
};

const ApprouveEventByAdmin = (req, res) => {
    const { _id } = req.params;

    Post.findOneAndUpdate({ id: _id }, { isApprouved: true }).populate('organizer')
        .then((foundEvent) => {
            console.log(foundEvent);
            if (!foundEvent) {
                return res.status(404).json({
                    status: "FAILED",
                    message: "Event not found"
                });
            }

            const { email, username } = foundEvent.organizer;

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
                    intro: "Hello, your event was approved by the admin. You can check it in your personal posts.",
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
                subject: "Event Approval",
                html: emailBody
            };

            // Send email
            transporter.sendMail(message)
                .then(() => {
                    // Call newEvent function to update follower notifications
                    newEvent(foundEvent.organizer, foundEvent);
                    res.status(200).send({ msg: "You should receive an email from us" });
                })
                .catch((error) => {
                    console.error(error);
                    res.json({
                        status: "FAILED",
                        message: "We could not send the request to the organizer"
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                status: "FAILED",
                message: "Internal server error"
            });
        });
};

module.exports = ApprouveEventByAdmin;
