const Post = require('../models/post')
const User = require('../models/user')
const Admin = require('../models/admin')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const WarnUser = async(req , res) => {
    const { id } = req.params;

    const post = await Post.findById(id).populate('organizer');
    if(post) {
        const warnedUser = post.organizer;
        const { email, username, warnings } = warnedUser;

        await User.findByIdAndUpdate(warnedUser._id , {
            $inc : {warnings: 1}
        });

        console.log(warnedUser);
        console.log(warnedUser._id);

        if (warnedUser.warnings >= 3) {
            const emailAdmin = "admin@gmail.com";
            // Update admin's usersRegistered count
            await Admin.findOne({ email: emailAdmin })
                .then((adminFound) => {
                    adminFound.usersRegistered = adminFound.usersRegistered - 1;
                    adminFound.save(); // Save the changes to the admin
                })
                .catch((err) => console.log(err));
            
            // Delete user from the database
            await User.findByIdAndDelete(warnedUser._id); // Adding await here to wait for the deletion process
            
            // Delete posts associated with the user
            await Post.deleteMany({ organizer: warnedUser._id }); // Using the ID directly to find posts

            // Once the user and their posts are deleted, you may want to return or send a response.
            return res.status(200).json({ message: "User and associated posts deleted successfully." });
        }
        else {
            // If warnings are less than 3, send a warning email to the user
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
                    intro: ` Hello, your event has been reported by a user. Therefore, you are warned by the admin of our platform. The number of your warnings is ${warnings + 1}. If you get 3 warnings, your account and posts will be deleted.`,
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

            transporter.sendMail(message);
            return res.status(200).json({ message: "User warned successfully." });
        }
    }
    else {
        return res.status(404).json({ message: "Post not found." });
    }
}

module.exports = WarnUser;
