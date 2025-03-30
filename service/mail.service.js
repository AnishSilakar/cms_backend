const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const dotenv = require('dotenv');
const { log } = require('console');
dotenv.config();

class MailService {
    sendMail = async (formParams) => {
        const { to, subject, body , template, emailSignature} = formParams;
    
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
          auth: {
            user: process.env.EMAIL_NAME, // Sender address, // Your email address
            pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
          },
        })
    
        // Render the email template using EJS
        const templatePath = path.join(__dirname, '../views/', template);
        const emailHTML = await ejs.renderFile(templatePath, { body, subject , emailSignature});
    
        // Define email options
        const mailOptions = {
          from: process.env.EMAIL_NAME, // Sender address
          to,
          subject,
          html: emailHTML,
        };
    
        // Send the email
        await transporter.sendMail(mailOptions);
      }
}

module.exports = new MailService();