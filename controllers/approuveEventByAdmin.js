const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const Post = require('../models/post');

const ApprouveEvent = (req, res) => {
    const { eventId } = req.params;

    Post.findOne({eventId}).populate('organizer')
        .then((foundEvent) => {
            if (!foundEvent) {
                return res.status(404).json({
                    status: "FAILED",
                    message: "Event not found"
                });
            }

            foundEvent.isApprouved = true;
            foundEvent.save()
                .then(() => {
                    const { email, username } = foundEvent.organizer;
                    console.log(email)
                    console.log(username)

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
                        .then(() => res.status(200).send({ msg: "You should receive an email from us" }))
                        .catch((error) => {
                            console.error(error);
                            res.json({
                                status: "FAILED",
                                message: "We could not send the request to the organizer"
                            });
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        status: "FAILED",
                        message: "Internal server error"
                    });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: "FAILED",
                message: "Internal server error"
            });
        });
};

module.exports = ApprouveEvent;
