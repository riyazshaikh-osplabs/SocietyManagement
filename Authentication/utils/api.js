import logger from "../setup/logger.js";
import crypto from "crypto";
import { TESTING_EMAILS } from "../setup/secrets.js";

const sendResponse = (responseObj, statusCode, message, data = [], errors = []) => {
    const response = {
        success: true,
        message: '',
        data: [],
        errors: []
    }

    if ([200, 201, 202, 203, 204].includes(statusCode)) {
        response.success = true;
    } else {
        response.success = false;
    }

    response.message = message ?? '';
    response.data = data;
    response.errors = errors;

    return responseObj.status(statusCode).json(response);
}

const sendError = (err, req, res, next) => {
    const errorStatus = err?.status || 500;
    let errorMessage = err?.message || "Something went wrong";

    if (Array.isArray(err)) {
        errorMessage = err.map((e) => e.message);
    }

    sendResponse(res, errorStatus, errorMessage);
    return next();
}

const requestLogger = (req, res, next) => {
    logger.debug(`Request : ${req.method} ${req.originalUrl}`);
    next();
}

const generateOtp = (email) => {
    if (TESTING_EMAILS?.split(',')?.includes(email)) {
        return "1234";
    }
    return crypto.randomInt(1000, 9999).toString();
}

export {
    sendResponse,
    sendError,
    requestLogger,
    generateOtp
}