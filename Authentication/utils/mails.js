import { sendmail } from "./nodemailer.js";

export const sendForgotPasswordMail = (email, subject, html) => {
    sendmail(email, subject, html);
}