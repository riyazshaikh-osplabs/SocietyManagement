import { sequelize } from '../setup/db.js';
import { sendResponse } from '../utils/api.js';
import { resetPasswordInDb, saveEmailToken, signUp, updateLastLoggedIn, updateUpdateBy, useEmailToken } from '../models/helpers/index.js';
import { resetPasswordInFirebase, revokeTokens, signInFirebase, signUpFirebase } from '../utils/firebase.js';
import { encryptPassword, validatePassword } from '../utils/bcrypt.js';
import logger from '../setup/logger.js';
import moment from 'moment';
import { sendForgotPasswordMail } from '../utils/mails.js';
import crypto from "crypto";

const SignUp = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    try {
        const { firstName, lastName, password, email, mobile, buildingWing, roomNumber, role, address } = req.body;

        logger.debug(`Encrypting your password`);
        const hashedPassword = await encryptPassword(password);
        logger.debug(`Your password encrypted successfully`);

        logger.debug(`Signup with database for email: ${email}`);
        const user = await signUp(firstName, lastName, hashedPassword, email, mobile, buildingWing, roomNumber, role, address, true, false, true, transaction);
        logger.debug(`Successfully signup in the database for email: ${email}`);

        const userId = user?.dataValues?.userId;
        logger.debug(`Signup with firebase for userId: ${userId}`);
        await signUpFirebase(userId, email, password, true);
        logger.debug(`Successfully signup in firebase for userId: ${userId}`);

        logger.debug(`Committing transactions to the database`);
        await transaction?.commit();
        logger.debug(`Admin user created successfully`);

        const signupResponse = {
            firstName: user?.dataValues?.firstName,
            lastName: user?.dataValues?.lastName,
            email: user?.dataValues?.email,
            mobile: user?.dataValues?.mobile,
            roomNumber: user?.dataValues?.roomNumber,
            address: user?.dataValues?.address,
            role: user?.dataValues?.role
        };
        logger.debug(`signupResponse ${JSON.stringify(signupResponse, null, 2)}`);

        sendResponse(res, 200, 'Admin user created successfully', [signupResponse]);
    } catch (error) {
        logger.error(error);
        logger.debug('Rolling back any database transactions');
        await transaction?.rollback();
        next(error);
    }
}

const SignIn = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    try {
        const { email, password } = req.body;
        const { userId, dbPassword } = req.payload;

        logger.debug(`Validating your password`);
        const isPasswordValid = await validatePassword(password, dbPassword);

        if (!isPasswordValid) {
            logger.debug(`Invalid Password`);
            return sendResponse(res, 401, 'Invalid Password');
        }
        logger.debug(`Your password is validated successfully`);

        logger.debug(`Signin with firebase with userId: ${userId}`);
        const user = await signInFirebase(email, password);
        logger.debug(`Signin successfully with firebase for userId: ${userId}`);

        const signinResponse = {
            accessToken: user?.user?.accessToken,
            refreshToken: user?.user?.refreshToken,
            expiresIn: user?.user?.stsTokenManager?.expirationTime
        }

        const expirationTime = moment().add(1, 'hours');
        signinResponse.expiresIn = expirationTime.format('HH:mm:ss');

        logger.debug(`Updating the lastLoggedin time`);
        await updateLastLoggedIn(userId, transaction);
        logger.debug(`lastLoggedIn time is updated`);

        logger.debug(`Commiting transactions to the database`);
        await transaction?.commit();
        logger.log(`User loggedIn successfully`);

        logger.log(`signinResponse: ${JSON.stringify(signinResponse, null, 2)}`);
        sendResponse(res, 200, 'User loggedIn successfully', [signinResponse]);
    } catch (error) {
        logger.error(error);
        logger.debug(`Rolling back any database transactions`);
        await transaction?.rollback();
        next(error);
    }
}

const SignOut = async (req, res, next) => {
    try {
        const { userId } = req.payload;

        logger.debug(`Revoking refresh tokens for userId: ${userId}`);
        await revokeTokens(userId);
        logger.debug(`Refresh tokens revoked for userId: ${userId}`);

        logger.debug(`User Logged Out successfully`);
        sendResponse(res, 200, 'User loggedOut successfully');
    } catch (error) {
        logger.error(error.message);
        logger.debug(`Error while signOut`);
        next(error);
    }
}

const ResetPassword = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    try {
        const { userId } = req.payload;
        const { emailToken, password, confirmPassword } = req.body;

        if (!(password === confirmPassword)) {
            await transaction?.rollback();
            return sendResponse(res, 403, 'Password does not match');
        }

        logger.debug(`Using email token`);
        await useEmailToken(userId, emailToken, transaction);
        logger.debug(`Email token used`);

        logger.debug(`Updating updatedBy`);
        await updateUpdateBy(userId, userId, transaction);
        logger.debug(`Updated successfully`);

        logger.debug(`Encrypting your new password`);
        const hashedPassword = await encryptPassword(confirmPassword);
        logger.debug(`Your new password encrypted successfully`);

        logger.debug(`Changing password in database for userId: ${userId}`);
        const pass = await resetPasswordInDb(userId, hashedPassword);
        logger.log(`updatedUser: ${pass}`);
        logger.debug(`Password changed successfully in database for userId: ${userId}`);

        logger.debug(`Changing password in firebase for userId: ${userId}`);
        await resetPasswordInFirebase(userId, confirmPassword);
        logger.debug(`Password changed successfully in firebase for userId: ${userId}`);

        logger.debug(`Updating updatedBy for userId: ${userId}`);
        await updateUpdateBy(userId, userId, transaction);
        logger.debug(`Updated updatedBy successfully for userId: ${userId}`);

        logger.log(`Password reset successfully`);
        sendResponse(res, 200, 'Password reset successfully');
    } catch (error) {
        logger.error(error.message);
        logger.debug(`Rolling back any database transactions`);
        await transaction?.rollback();
        next(error);
    }
}

const ForgotPassword = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    try {
        const userId = req.payload?.userId;
        const firstName = req.payload?.firstName;
        const email = req.body?.email;

        logger.debug(`Creating email token`);
        const emailToken = crypto.randomBytes(128).toString('hex');
        logger.debug(`Email token created successfully`);

        logger.debug('Saving email token');
        await saveEmailToken(userId, emailToken, transaction);
        logger.debug('Email token saved successfully');

        const resetPasswordUrl = `http://localhost:3000/reset-password/${userId}?token=${emailToken}`;
        const html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml><o:officedocumentsettings><o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml><![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><title></title><style type="text/css">@media only screen and (min-width:620px){.u-row{width:600px!important}.u-row .u-col{vertical-align:top}.u-row .u-col-100{width:600px!important}}@media (max-width:620px){.u-row-container{max-width:100%!important;padding-left:0!important;padding-right:0!important}.u-row .u-col{min-width:320px!important;max-width:100%!important;display:block!important}.u-row{width:100%!important}.u-col{width:100%!important}.u-col>div{margin:0 auto}}body{margin:0;padding:0}table,td,tr{vertical-align:top;border-collapse:collapse}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}table,td{color:#000}#u_body{position:absolute;top:25%}#u_body a{color:#00e;text-decoration:underline}@media (max-width:480px){#u_content_image_1 .v-container-padding-padding{padding:40px 10px 10px!important}#u_content_image_1 .v-src-width{width:auto!important}#u_content_image_1 .v-src-max-width{max-width:50%!important}#u_content_heading_1 .v-container-padding-padding{padding:10px 10px 20px!important}#u_content_heading_1 .v-font-size{font-size:22px!important}#u_content_heading_2 .v-container-padding-padding{padding:40px 10px 10px!important}#u_content_text_2 .v-container-padding-padding{padding:10px!important}#u_content_heading_3 .v-container-padding-padding{padding:10px!important}#u_content_button_1 .v-container-padding-padding{padding:30px 10px 40px!important}#u_content_button_1 .v-size-width{width:65%!important}#u_content_social_1 .v-container-padding-padding{padding:40px 10px 10px!important}#u_content_text_deprecated_1 .v-container-padding-padding{padding:10px 10px 20px!important}#u_content_image_2 .v-container-padding-padding{padding:20px 10px 40px!important}}</style><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]--></head><body class="clean-body u_body" style="margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#f9f9ff;color:#000"><!--[if IE]><div class="ie-container"><![endif]--><!--[if mso]><div class="mso-container"><![endif]--><table id="u_body" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;min-width:320px;Margin:0 auto;background-color:#f9f9ff;width:100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align:top"><td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f9f9ff"><![endif]--><div class="u-row-container" style="padding:0;background-color:transparent"><div class="u-row" style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"><div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr style="background-color:transparent"><![endif]--><!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#fff;width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top"><div style="background-color:#fff;height:100%;width:100%!important"><!--[if (!mso)&(!IE)]><!--><div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"><!--<![endif]--><table id="u_content_image_1" style="font-family:Raleway,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:Raleway,sans-serif" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right:0;padding-left:0" align="center"> <?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="96.107px" height="122.879px" viewBox="0 0 96.107 122.879" enable-background="new 0 0 96.107 122.879" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M2.892,56.036h8.959V37.117c0-10.205,4.177-19.483,10.898-26.208v-0.009 C29.473,4.177,38.754,0,48.966,0C59.17,0,68.449,4.177,75.173,10.9l0.009,0.009c6.722,6.724,10.898,16.003,10.898,26.208v18.918 l7.136,0.001c1.591,0,2.892,1.301,2.892,2.891v61.061c0,1.59-1.302,2.891-2.892,2.891H2.892c-1.59,0-2.892-1.301-2.892-2.891 V58.926C0,57.337,1.302,56.036,2.892,56.036L2.892,56.036z M51.823,98.139h-8.962v-0.992c0-1.684,0.176-3.049,0.522-4.096 c0.346-1.055,0.852-2.012,1.535-2.881c0.683-0.867,2.219-2.393,4.605-4.582c1.271-1.143,1.905-2.197,1.905-3.146 c0-0.957-0.257-1.701-0.771-2.225c-0.507-0.531-1.286-0.797-2.323-0.797c-1.125,0-2.05,0.408-2.781,1.223 c-0.731,0.807-1.198,2.234-1.406,4.254l-9.116-1.25c0.314-3.695,1.536-6.674,3.666-8.924c2.13-2.262,5.394-3.387,9.791-3.387 c3.424,0,6.188,0.789,8.295,2.367c2.861,2.127,4.292,4.973,4.292,8.525c0,1.473-0.369,2.891-1.108,4.264 c-0.732,1.365-2.243,3.041-4.518,5.016c-1.584,1.383-2.589,2.5-2.999,3.342C52.033,95.693,51.823,96.783,51.823,98.139 L51.823,98.139z M42.556,102.711h9.598v7.34h-9.598V102.711L42.556,102.711z M26.271,56.036h45.387V36.911 c0-6.241-2.554-11.917-6.662-16.03l-0.005,0.004c-4.111-4.114-9.787-6.669-16.025-6.669c-6.24,0-11.916,2.554-16.032,6.665 c-4.108,4.113-6.662,9.79-6.662,16.03V56.036L26.271,56.036L26.271,56.036z"/></g></svg></td></tr></table></td></tr></tbody></table><table id="u_content_heading_1" style="font-family:Raleway,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 30px;font-family:Raleway,sans-serif" align="left"><h1 class="v-font-size" style="margin:0;line-height:140%;text-align:center;word-wrap:break-word;font-size:28px;font-weight:400"><strong>Forgot password ?</strong></h1></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></div><div class="u-row-container" style="padding:0;background-color:transparent"><div class="u-row" style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"><div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent"><!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr style="background-color:transparent"><![endif]--><!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#fff;width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top"><div style="background-color:#fff;height:100%;width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0"><!--[if (!mso)&(!IE)]><!--><div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0"><!--<![endif]--><table id="u_content_heading_2" style="font-family:Raleway,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 60px 10px;font-family:Raleway,sans-serif" align="left"><h1 class="v-font-size" style="margin:0;line-height:140%;text-align:center;word-wrap:break-word;font-size:18px;font-weight:600">Hi, ${firstName}</h1></td></tr></tbody></table><table id="u_content_heading_3" style="font-family:Raleway,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:Raleway,sans-serif" align="left"><h1 class="v-font-size" style="margin:0;line-height:140%;text-align:center;word-wrap:break-word;font-size:14px;font-weight:400">There was a request to change your password! If you did not make this request, then please ignore this email. Otherwise, please click this button to change your password.</h1></td></tr></tbody></table><table id="u_content_button_1" style="font-family:Raleway,sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 40px;font-family:Raleway,sans-serif" align="left"><!--[if mso]><style>.v-button{background:0 0!important}</style><![endif]--><div align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.unlayer.com" style="height:37px;v-text-anchor:middle;width:220px" arcsize="67.5%" stroke="f" fillcolor="#fdb441"><w:anchorlock><center style="color:#000"><![endif]--><a href="${resetPasswordUrl}" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing:border-box;display:inline-block;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#000;background-color:#fdb441;border-radius:25px;-webkit-border-radius:25px;-moz-border-radius:25px;width:38%;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none;font-size:14px"><span style="display:block;padding:10px 20px;line-height:120%"><span style="line-height:16.8px;font-weight:500">Reset Your Password</span></span></a><!--[if mso]><![endif]--></div></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]--></div></div></div><!--[if (mso)|(IE)]><![endif]--></td></tr></tbody></table><!--[if mso]><![endif]--><!--[if IE]><![endif]--></body></html>`

        logger.debug(`Sending mail of forgot password`);
        await sendForgotPasswordMail(email, 'Forgot Password', html);
        logger.debug(`Forgot password mail sent successfully`);

        logger.debug(`Commiting transactions to database`);
        await transaction?.commit();
        sendResponse(res, 200, 'Reset password link send successfully');
    } catch (error) {
        logger.error(error.message);
        logger.debug(`Rolling back any database transactions`);
        await transaction?.rollback();
        next(error)
    }
}

export {
    SignUp,
    SignIn,
    SignOut,
    ResetPassword,
    ForgotPassword
}