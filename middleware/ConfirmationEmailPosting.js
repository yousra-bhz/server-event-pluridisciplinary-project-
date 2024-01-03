const nodemailer = require('nodemailer');
const Mailgen = require('mailgen'); // Corrected import statement

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "brandt22@ethereal.email",
        pass: "Sw4zVJPRah4f3j5MzQ",
    },
};

let transporter = nodemailer.createTransport(nodeConfig);

let mailGenerator = new Mailgen({ // Corrected variable name
    theme: "default", // Corrected theme name
    product: {
        name: "mailegen",
        link: "https://mailgen.js/"
    }
});

const ConfirmAddPost = async (req, res)  => { // Added req, res parameters
    try {
        const {usermail , username} = req.user

        // Body of the email
        var email = {
            body: {
                name: username,
                intro:  "Hello Your Request Will Be Treated , Please Wait For The Confirmation Of Your Event By The Admin",
                outro: "Need help? Just reply to this email."
            }
        };

        var emailBody = mailGenerator.generate(email); // Corrected variable name
        let message = {
            from: "brandt22@ethereal.email",
            to: usermail,
            subject:"Event Confirmation",
            html: emailBody
        };

        // Send mail
        await transporter.sendMail(message); 
        return res.status(200).send({ msg: "You should receive an email from us" })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = ConfirmAddPost;
