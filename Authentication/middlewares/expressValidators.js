import { validationResult, body } from "express-validator";
import { sendResponse } from "../utils/api.js";

const ValidateReqParams = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().forEach(err => extractedErrors.push({ [err.path]: err.msg }))

    sendResponse(res, 422, 'Invalid or missing parameters', [], extractedErrors);
}

const SignupValidationRules = () => {
    return [
        body('email')
            .not().isEmpty().withMessage('Email is required').bail()
            .isEmail().withMessage('Provide a valid email')
            .normalizeEmail()
            .trim(),
        body('password')
            .not().isEmpty().withMessage('Password is required').bail()
            .isString().withMessage('Password must be of type String').bail()
            .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 to 20 characters')
            .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain atleast one lowercase, uppercase, number and special characters'),
    ]
}

export {
    ValidateReqParams,
    SignupValidationRules
}