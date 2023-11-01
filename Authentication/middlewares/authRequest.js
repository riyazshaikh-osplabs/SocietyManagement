import { sendResponse } from "../utils/api.js";
import { getUserById, getUserByRoomNumber, getUserFromEmail, isEmailTokenValid, isValidRoomNumber, verifyUserOtp } from "../models/helpers/index.js";
import logger from "../setup/logger.js";
import admin from "../setup/firebase.js";
import jwt from "jsonwebtoken";

const ValidateClaims = isAdmin => {
    return async (req, res, next) => {
        try {
            logger.debug('Validating claims');

            const bearerToken = req.headers?.authorization;
            if (!bearerToken) {
                return sendResponse(res, 401, 'Missing Authorization Header');
            }

            const token = bearerToken.split(' ')[1];

            let decodedToken;
            try {
                decodedToken = await admin.auth().verifyIdToken(token, isAdmin);
                logger.log('decodedToken', decodedToken);
            } catch (error) {
                logger.error(error.message);
                logger.debug(`Invalid Token`);
                return sendResponse(res, 401, 'Invalid Token');
            }
            const adminClaim = decodedToken?.admin;

            if (isAdmin !== adminClaim) {
                return sendResponse(res, 403, 'Invalid Claim in token');
            }

            const userDetails = await getUserById(decodedToken?.user_id, isAdmin, false, true);
            if (!userDetails) {
                return sendResponse(res, 404, 'Invalid User');
            }

            req.payload = {
                userId: decodedToken?.user_id,
                email: userDetails?.dataValues?.email,
                isAdmin: userDetails?.dataValues?.isAdmin,
                firstName: userDetails?.dataValues?.firstName
            }
            logger.log(`Claims validated successfully`);

            next();
        } catch (error) {
            logger.error(error);
            logger.debug(`Error in validating claims`);
        }
    }
}

const ValidateEmailForSignup = isAdmin => {
    return async (req, res, next) => {
        try {
            const email = req.body?.email;

            const userDetails = await getUserFromEmail(email, isAdmin, false, true);
            if (userDetails) {
                logger.debug(`User with email ${email} already registered`);
                return sendResponse(res, 404, 'User already registered');
            }

            next();
        } catch (error) {
            logger.error(error);
            logger.debug(`Error in ValidateEmail`);
            sendResponse(res, 500, `Internal Server Error ${error}`);
        }
    }
}

const ValidateEmailForSignin = isAdmin => {
    return async (req, res, next) => {
        try {
            const email = req.body?.email;

            const userDetails = await getUserFromEmail(email, isAdmin, false, true);
            if (!userDetails) {
                logger.debug(`User with email ${email} not found`);
                return sendResponse(res, 404, 'User not found')
            }

            if (!userDetails.activationStatus) {
                logger.debug(`User is disabled`);
                return sendResponse(res, 400, 'User is disabled');
            }

            req.payload = {
                userId: userDetails?.userId,
                firstName: userDetails?.firstName,
                isAdmin: userDetails?.isAdmin,
                lastLoggedInOn: userDetails?.lastLoggedInOn,
                dbPassword: userDetails?.password,
                email: userDetails?.email,
                role: userDetails?.role
            }
            next();
        } catch (error) {
            sendResponse(res, 500, `Internal Server Error ${error}`)
        }
    }
}

const ValidateRoomNumber = async (req, res, next) => {
    try {
        const roomNumber = Number(req.body?.roomNumber);
        const buildingWing = req.body?.buildingWing;

        const isRoomExists = await isValidRoomNumber(roomNumber, buildingWing);
        if (!isRoomExists) {
            return sendResponse(res, 403, 'Enter a valid Room Number');
        }

        const user = await getUserByRoomNumber(roomNumber, buildingWing);
        if (user) {
            return sendResponse(res, 400, 'Room is already occupied. Please choose another.');
        }

        next();
    } catch (error) {
        logger.error(error);
        logger.debug(`Error in validateRoomNumber`);
        next(error);
    }
}

const ValidateEmailToken = isAdmin => {
    return async (req, res, next) => {
        try {
            const emailToken = req.body?.emailToken;

            const tokenId = await isEmailTokenValid(emailToken);
            if (!tokenId) {
                return sendResponse(res, 401, 'Invalid Email Token');
            }

            const userDetails = await getUserById(tokenId, isAdmin, false, true);
            if (!userDetails) {
                return sendResponse(res, 404, 'Invalid User');
            }

            req.payload = {
                userId: tokenId.toString()
            }

            next()
        } catch (error) {
            logger.error(error);
            logger.debug(`Error in validateEmailToken`);
            next(error);
        }
    }
}

const ValidateOtp = async (req, res, next) => {
    try {
        const userId = req.payload?.userId;
        const { otp } = req.body;

        const valid = await verifyUserOtp(userId, otp);
        if (!valid) {
            return sendResponse(res, 401, 'Invalid Otp');
        }

        next();
    } catch (error) {
        logger.error(error);
        logger.debug(`Error in validateOtp`);
        next(error);
    }
}

export {
    ValidateClaims,
    ValidateEmailForSignup,
    ValidateEmailForSignin,
    ValidateRoomNumber,
    ValidateEmailToken,
    ValidateOtp
}