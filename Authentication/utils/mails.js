import { sendmail } from "./nodemailer.js";

export const sendForgotPasswordMail = async (email, subject, html) => {
    sendmail(email, subject, html);
}

export const sendOtpMail = async (email, subject, html) => {
    sendmail(email, subject, html);
}