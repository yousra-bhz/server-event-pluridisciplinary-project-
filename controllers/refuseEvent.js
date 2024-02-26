const Post = require('../models/post');
const User = require('../models/user');
const Admin = require('../models/admin');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen')
//WORKING

//steps:
//find event by id
//store orgnizer info 
//delete event from db
//increment the organizer's warnings
//send email alert to the organizer
//test the organizer of the event
//if the organizer had 3 warnings:
//delte organizer from db
//decrementing the usersRegistered in db in admin's model
//delete all organizer's events
const RefuseEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Post.findById(id).populate('organizer');
        if (event) {
            if (event.isApprouved === "") {
                const organizer = event.organizer;
                const {email , username } = organizer;
                // Save the organizer information
                organizer.warnings++;
                organizer.save();
                await Post.findByIdAndDelete(id);

                const mailGenerator = new Mailgen({
                    theme: "default",
                    product: {
                        name: "mailegen",
                        link: "https://mailgen.js/"
                    }
                });



                const Email = {
                    body: {
                        name: username,
                        intro: "Hello, your request is refused by the admin , and you hade one warnig when your warnings are 3 your accound and your events are deleted automaticly",
                        outro: "Need help? Just reply to this email."
                    }
                };



                    const emailBody = mailGenerator.generate(Email);

                    const transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    auth: {
                    user: "brandt22@ethereal.email",
                    pass: "Sw4zVJPRah4f3j5MzQ",
                        }
                    });


                    const message = {
                        from: "brandt22@ethereal.email",
                        to: email,
                        subject: "Event refused",
                        html: emailBody
                    };

                    transporter.sendMail(message)

    

                if (organizer.warnings === 3) {
                    const emailAdmin = "admin@gmail.com";
                    // Update admin's usersRegistered count
                    await Admin.findOne({ email: emailAdmin })
                        .then((adminFound) => {
                            adminFound.usersRegistered = adminFound.usersRegistered - 1;
                            return adminFound.save(); // Save the changes to the admin
                        })
                        .catch((err) => console.log(err));
                    
                    // Delete user from the database
                    await User.findByIdAndDelete(organizer._id);

                    // Delete all posts by the organizer
                    await Post.deleteMany({ 'organizer._id': organizer._id }); // Corrected 'organizer.id' to 'organizer._id'
                }

                // No need to save the event here, as it has already been removed
            }
        }

        res.status(200).json({ message: 'Event refused successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = RefuseEvent;