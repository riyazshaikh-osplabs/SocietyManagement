import { sequelize } from '../setup/db.js';
import { sendResponse } from '../utils/api.js';
import { resetPasswordInDb, saveEmailToken, signUp, updateLastLoggedIn, updateUpdateBy } from '../models/helpers/index.js';
import { resetPasswordInFirebase, revokeTokens, signInFirebase, signUpFirebase } from '../utils/firebase.js';
import { encryptPassword, validatePassword } from '../utils/bcrypt.js';
import logger from '../setup/logger.js';
import moment from 'moment';
import jwt from "jsonwebtoken";
import { sendForgotPasswordMail } from '../utils/mails.js';

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
        const { password, confirmPassword } = req.body;

        if (!(password === confirmPassword)) {
            await transaction?.rollback();
            return sendResponse(res, 403, 'Password does not match');
        }

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
        await updateUpdateBy(userId, transaction);
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
        // const password = req.payload?.dbPassword;
        // const isAdmin = req.payload?.isAdmin;

        const email = req.body?.email;

        logger.debug(`Creating email token`);
        const emailToken = crypto.randomBytes(128).toString('hex');
        logger.debug(`Email token created successfully`);

        logger.debug('Saving email token');
        await saveEmailToken(userId, emailToken, transaction);
        logger.debug('Email token saved successfully');

        const resetPasswordUrl = `http://localhost:3000/reset-password/${userId}?token=${emailToken}`;
        const html = `<html lang="en" style="height:100%;width:100%;margin:0;padding:10px;background-color:#f2f2ef;min-height:600px"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Forgot Password</title></head><body style="height:100%;width:100%;margin:0;padding:10px;background-color:#f2f2ef;min-height:600px"><table width="100%" height="100%" style="border-collapse:collapse;min-height:600px"><tr><td align="center" valign="middle" style="height:59%;min-height:354px;border-bottom:2px solid"><table width="100%" height="60%" style="border-collapse:collapse"><tr><td align="center" valign="middle" style="height:20%;font-size:2rem;font-weight:700">Forgot Password</td></tr><tr><td align="center" valign="middle" style="height:60%;font-size:1rem">Hi ${firstName},<br><br>There was a request to change your password!<br>If you did not make this request, then please ignore this email.<br>Otherwise, please click this button to change your password:</td></tr><tr><td align="center" valign="middle" style="height:20%;font-size:1rem"><a href='${resetPasswordUrl}' target="_blank" style="border-radius:5px;padding:9px;border:1px solid;cursor:pointer;font-size:1rem;text-decoration:none;color:#000;font-weight:none"><span>Change my Password!</span></a></td></tr></table></td></tr></table></body></html>`

        logger.debug(`Sending mail of forgot password`);
        sendForgotPasswordMail(email, 'Forgot Password', html);
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