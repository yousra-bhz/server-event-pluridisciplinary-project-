const Post = require('../models/post');
const User = require('../models/user')
const Admin = require('../models/admin')
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

//WORKING

const ApprouveEventByAdmin = async(req , res) => {
        const {id} = req.params;
        console.log(req.params)

        Post.findById(id).populate('organizer').then((foundevent) => {
            foundevent.isApprouved = "Approuved";
            const organizer = foundevent.organizer;
            console.log(organizer)
            foundevent.save().then(async () => {
                console.log(foundevent)
                const emailAdmin = "admin@gmail.com"
                await Admin.findOne({email : emailAdmin}).then((admin) => {
                    admin.eventsPerDay ++ 
                    admin.eventsPerMonth ++
                    admin.eventsPerYear++
                    admin.save()
                })
                .catch((err) =>  console.log(err))

                res.status(200).send('event approuved by admin check your email')
                organizer.followers.forEach(follower => {
                    User.findOneAndUpdate(follower.username , {
                        $push : {notification : `${organizer.username} has published a new event `}
                    })
                });
                        const {username , email} = foundevent.organizer;


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
                                intro: "Hello, your request is approuved by the admin. Now all intersted users will be able to see it also it will be displayed in your profil page.",
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
                                subject: "Event Approval",
                                html: emailBody
                            };

                            transporter.sendMail(message)

            })
            .catch((error) => {
                console.log(error);
                res.status(500).send('we could not save the event please try again')
            })


        })
        .catch((error) => {
            console.log(error);
            res.status(404).send('this event is not found')
        })
}

module.exports = ApprouveEventByAdmin