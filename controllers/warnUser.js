const Post = require('../models/post')
const User = require('../models/user')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const WarnUser = async(req , res) => {
    //we take the id of the post
    //we take the organizer of this post
    //we increment the warnings of this organizer
    //id it is equal to 3 we delete the user from the databse and we delete all his posts
            const {id} = req.params

            const post = await Post.findById(id).populate('organizer')
            const warnedUser = post.organizer
            const {email , username , warnings} = warnedUser
            

            await User.findByIdAndUpdate(warnedUser._id , {
                $inc : {warnings :1 }
            })
            


            
            if (warnedUser.warnings === 3) {
                const emailAdmin = "admin@gmail.com";
                // Update admin's usersRegistered count
                await Admin.findOne({ email: emailAdmin })
                    .then((adminFound) => {
                        adminFound.usersRegistered = adminFound.usersRegistered - 1;
                        return adminFound.save(); // Save the changes to the admin
                    })
                    .catch((err) => console.log(err));
                // Delete user from the database
                await Post.deleteMany({ 'organizer._id': warnedUser._id }); 
                await User.findByIdAndDelete(warnedUser._id);
            }
            else {
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
                        intro: ` Hello your event is reported by a user , therefore you are warned by the admin of our plateform , the number of your warnings is ${warnings +1} if you get 3 warnings your account and post will be all deleted `,
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

            }
}

module.exports = WarnUser