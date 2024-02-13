const otpGenerator = require('otp-generator');
const User = require('../models/user')
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen')

const generateOTP = async(req , res) =>{
req.app.locals.OTP =  await otpGenerator.generate(6 , {lowerCaseAlphabets :false , upperCaseAlphabets : false , specialChars : false} );
const OTP = req.app.locals.OTP
  //send the OTP to the user
const { username} = req.query;
const user = await User.findOne({username})
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
                    intro: `<p>Hello, here is your OTP <strong style="color: red;">${OTP}</strong></p>`,
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
                to: user.email,
                subject: "Reset Password",
                html: emailBody
            };

            // Send email
            try {
              // Send email
              await transporter.sendMail(message);
              console.log('Email sent successfully');
          } catch (error) {
              console.error('Error sending email:', error);
              // Handle the error, for example, by sending an error response to the client.
              res.status(500).send({ error: 'Internal Server Error' });
          }

  res.status(201).send({ code : req.app.locals.OTP })
}

module.exports = generateOTP