const Admin = require('../models/admin');
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const HelpYou = async(req , res) => {
    try {
        const { lastName, firstName, email, paragraph } = req.body;
        const help = {
            email,
            paragraph,
            date: Date.now()
        }
        const admin = await Admin.findById("65dad6407231d4b7feb9b8ba");
        admin.Helps.push(help)
        
        if (!admin) {
            return res.status(404).send('Admin not found');
        }
        
        console.log(admin);

        const mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "mailegen",
                link: "https://mailgen.js/"
            }
        });

        const Email = {
            body: {
                name: lastName + firstName,
                intro: ` Hello, We have received your question , and we are going to do our best to answer you `,
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
            subject: "Help",
            html: emailBody
        };
        
        await transporter.sendMail(message);
        return res.status(200).send('Your question will be answered');
    } catch (error) {
        console.log(error);
        res.status(501).send("An error has occurred, please try again");
    }
}

module.exports = HelpYou;
