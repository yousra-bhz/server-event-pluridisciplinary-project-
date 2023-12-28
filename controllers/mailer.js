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

const registerMail = async (req, res) => { // Added req, res parameters
    try {
        const { username, usermail, text, subject } = req.body;

        // Body of the email
        var email = {
            body: {
                name: username,
                intro: text || "Welcome to Yousra Tuition. I'm very excited to have you on board.",
                outro: "Need help? Just reply to this email."
            }
        };

        var emailBody = mailGenerator.generate(email); // Corrected variable name
        let message = {
            from: "brandt22@ethereal.email",
            to: usermail,
            subject: subject || "Signup successful",
            html: emailBody
        };

        // Send mail
        await transporter.sendMail(message); // Used await to handle promise

        return res.status(200).send({ msg: "You should receive an email from us" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = registerMail;
