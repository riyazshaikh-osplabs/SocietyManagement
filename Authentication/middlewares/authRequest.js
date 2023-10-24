import { sendResponse } from "../utils/api.js";
import { getUserFromEmail } from "../models/helpers/index.js";
import logger from "../setup/logger.js";

const ValidateClaims = isAdmin => {
    try {

    } catch (error) {
        logger.error(error);
        logger.debug(`Error in validating claims`);
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

            if (!userDetails.activationStatus) {
                return sendResponse(res, 400, 'User is disabled');
            }

            req.payload = {
                userId: userDetails.userId,
                isAdmin: userDetails.isAdmin,
                isDeleted: userDetails.isDeleted,
                lastLoggedInOn: userDetails.lastLoggedInOn,
                mobile: userDetails.mobile,
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                role: userDetails.role
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
                userId: userDetails.userId,
                isAdmin: userDetails.isAdmin,
                isDeleted: userDetails.isDeleted,
                lastLoggedInOn: userDetails.lastLoggedInOn,
                mobile: userDetails.mobile,
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                role: userDetails.role
            }
            next();
        } catch (error) {
            sendResponse(res, 500, `Internal Server Error ${error}`)
        }
    }
}


export {
    ValidateClaims,
    ValidateEmailForSignup,
    ValidateEmailForSignin
}