import { sequelize } from '../setup/db.js';
import { generateOtp, sendResponse } from '../utils/api.js';
import { resetPasswordInDb, saveEmailToken, saveOtp, signUp, updateLastLoggedIn, updateUpdateBy, useEmailToken, useOtp } from '../models/helpers/index.js';
import { resetPasswordInFirebase, revokeTokens, signInFirebase, signUpFirebase } from '../utils/firebase.js';
import { encryptPassword, validatePassword } from '../utils/bcrypt.js';
import logger from '../setup/logger.js';
import moment from 'moment';
import { sendForgotPasswordMail, sendOtpMail } from '../utils/mails.js';
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
        const { email, password, otp } = req.body;
        const { userId, dbPassword } = req.payload;

        logger.log('Verifying Otp');
        await useOtp(userId, otp, transaction);
        logger.log('Otp verified');

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
        const html = `<!DOCTYPE html><html><head><title>OTP Verification</title><style>body{font-family:Arial,sans-serif;background-color:#f5f5f5;margin:0;padding:0}.container{max-width:450px;margin:0 auto;background-color:#fff;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,.1);padding:20px;text-align:left}.center-align{text-align:center}.otp-box{background-color:#fdb441;color:#000;padding:15px;display:inline-block;border-radius:5px;font-size:16px;font-weight:700}h1{color:#00466a;text-align:center}p{font-size:16px}.highlight{background-color:#00466a;color:#fff;padding:5px;border-radius:5px}</style></head><body><div class="container"><h1>Forgot Password?</h1><p style="font-weight:600">Hello, ${firstName}</p><p>There was a request to change your password! If you did not make this request, then please ignore this email. Otherwise, please click this button to change your password.</p><div class="center-align"><a href="${resetPasswordUrl}" style="text-decoration:none;-webkit-text-size-adjust:none" target="_blank"><div class="otp-box">Reset Password</div></a></div><p>Thanks</p></div></body></html>`

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

const SendOtp = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    try {
        const userId = req.payload?.userId;
        const email = req.payload?.email;
        const firstName = req.payload?.firstName;

        const otp = generateOtp();
        const message = `Your verification code is: ${otp}.`;
        logger.debug(`${message}`);

        logger.debug(`Saving otp in database`);
        await saveOtp(userId, otp, transaction);

        const html = `<!DOCTYPE html><html><head><title>OTP Verification</title><style>body{font-family:Arial,sans-serif;background-color:#f5f5f5;margin:0;padding:0}.container{max-width:450px;margin:0 auto;background-color:#fff;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,.1);padding:20px;text-align:left}.center-align{text-align:center}.otp-box{background-color:#fdb441;color:#000;padding:15px;display:inline-block;border-radius:5px;font-size:24px;font-weight:700}h1{color:#00466a;text-align:center}p{font-size:16px}.highlight{background-color:#00466a;color:#fff;padding:5px;border-radius:5px}</style></head><body><div class="container"><h1>Verification Code</h1><p style="font-weight:600">Hello, ${firstName}</p><p>Please use the verification code below to sign in</p><div class="center-align"><div class="otp-box">${otp}</div></div><p>If you didn't request this, you can ignore this email.</p><p>Thanks</p></div></body></html>`;

        logger.debug(`Sending otp on email ${email}`);
        await sendOtpMail(email, 'Verification OTP', html);

        logger.debug('Commiting transactions to database');
        await transaction?.commit();

        sendResponse(res, 200, 'OTP request send successfully', [{ email }]);
    } catch (error) {
        logger.error(error);
        logger.debug('Rolling back any database transactions');
        await transaction?.rollback();
        next(error);
    }
}

export {
    SignUp,
    SignIn,
    SignOut,
    ResetPassword,
    ForgotPassword,
    SendOtp
}