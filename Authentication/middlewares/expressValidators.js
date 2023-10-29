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
        body('firstName')
            .optional()
            .isString().withMessage('First Name should be a string').bail()
            .isLength({ min: 2, max: 20 }).withMessage('First Name must be between 2 to 20 characters')
            .trim(),
        body('lastName')
            .optional()
            .isString().withMessage('Last Name should be a string').bail()
            .isLength({ min: 2, max: 20 }).withMessage('Last Name must be between 2 to 20 characters')
            .trim(),
        body('email')
            .not().isEmpty().withMessage('Email is required').bail()
            .isEmail().withMessage('Provide a valid email')
            .normalizeEmail()
            .trim(),
        body('password')
            .not().isEmpty().withMessage('Password is required').bail()
            .isString().withMessage('Password must be of type String').bail()
            .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 to 20 characters')
            .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain atleast one lowercase, uppercase, number and special characters')
            .trim(),
        body('mobile')
            .not().isEmpty().withMessage('Mobile is required')
            .isInt().withMessage('Mobile should be of type number')
            .isLength({ max: 10 }).withMessage('Mobile should be of 10 number')
            .trim(),
        body('buildingWing')
            .not().isEmpty().withMessage('Building Wing is required')
            .isString().withMessage('Building Wings should be of type string')
            .isLength({ max: 1 }).withMessage('Wing should be of single character')
            .trim(),
        body('roomNumber')
            .not().isEmpty().withMessage('Room Number is required')
            .isInt().withMessage('Room Number should be of type number')
            .trim(),
        body('role')
            .not().isEmpty().withMessage('Role is required')
            .isInt().withMessage('Role should be of type number')
            .trim(),
        body('address')
            .not().isEmpty().withMessage('Address is required')
            .isString().withMessage('Address should be of type string')
            .isLength({ max: 200 }).withMessage('Address should be of 200 characters')
            .trim()
    ]
}

const SiginValidationRules = () => {
    return [
        body('email')
            .not().isEmpty().withMessage('Email is required').bail()
            .isEmail().withMessage('Provide a valid email').bail()
            .normalizeEmail()
            .trim(),
        body('password')
            .not().isEmpty().withMessage('Password is required').bail()
            .isString().withMessage('Password must be of type string').bail()
            .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 to 20 characters').bail()
            .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain atleast one lowercase, uppercase, number and special characters')
            .trim()
    ]
}

const ValidateResetPassword = () => {
    return [
        body('password')
            .not().isEmpty().withMessage('Password is required').bail()
            .isString().withMessage('Password must be of type string').bail()
            .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 to 20 characters').bail()
            .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain atleast one lowercase, uppercase, number and special characters')
            .trim(),
        body('confirmPassword')
            .not().isEmpty().withMessage('Password is required').bail()
            .isString().withMessage('Password must be of type string').bail()
            .isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 to 20 characters').bail()
            .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain atleast one lowercase, uppercase, number and special characters')
            .trim()
    ]
}

export {
    ValidateReqParams,
    SignupValidationRules,
    SiginValidationRules,
    ValidateResetPassword
}