const Post = require('../models/post')
const User = require('../models/user')



const CancelEvent = async (req , res) =>{
    const {_id} = req.user
    const {id} = req.params

    const post = await Post.findById(id)
    let interestedUsers = [];

    if (post && post.interested) {
    interestedUsers = post.interested;
    
    } else {
    console.log('Post or Interested is undefined:', post);
    }

    for (const userId of interestedUsers) {
        const user = await User.findById(userId);

        if (user) {
                user.notificationEvent.push({
                event : post._id,
                date: Date.now(),
                message: 'this event is canceled',
                });

                // Save the changes to the user
                await user.save();

                const {email , username} = user



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
                            intro: "Hello, an event has been ca,celed please check your account ",
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
                        res.status(200).send("email sent succesfully")
    
        
        } else {
                console.log('User not found with ID:', userId);
                res.status(501).send('we could not relise this operation')
        }
        }

}

module.exports = CancelEvent