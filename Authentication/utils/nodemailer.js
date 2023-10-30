import nodemailer from "nodemailer";
import logger from "../setup/logger.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    requireTLS: true,
    auth: {
        user: "work.riyazosplabs@gmail.com",
        pass: "abdwepzqdyrdvhwh",
    },
});

export const sendmail = (email, subject, html) => {
    const mailOptions = {
        from: "work.riyazosplabs@gmail.com",
        to: email,
        subject: subject,
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.log("Error in sending mails: ", error.toString());
            return false;
        } else {
            logger.log("Email Sent" + info.response);
            return true;
        }
    });
};