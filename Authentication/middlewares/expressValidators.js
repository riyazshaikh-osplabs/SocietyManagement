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
            .not().isEmpty().withMessage('Mobile is required').bail()
            .isInt().withMessage('Mobile should be of type number').bail()
            .isLength({ max: 10 }).withMessage('Mobile should be of 10 number').bail()
            .trim(),
        body('buildingWing')
            .not().isEmpty().withMessage('Building Wing is required').bail()
            .isString().withMessage('Building Wings should be of type string').bail()
            .matches(/^[A-Z]+$/).withMessage('Input should consist of capital letters only')
            .trim(),
        body('roomNumber')
            .not().isEmpty().withMessage('Room Number is required').bail()
            .isString().withMessage('Room Number should be of type string').bail()
            .matches(/^[A-Z]\/\d{3}$/).withMessage('Room Number should match the format X/XXX')
            .trim(),
        body('role')
            .not().isEmpty().withMessage('Role is required').bail()
            .isInt().withMessage('Role should be of type number')
            .trim(),
    ]
}

const LoginOtpValidationRules = () => {
    return [
        body('email')
            .not().isEmpty().withMessage('Email is required').bail()
            .isEmail().withMessage('Provide a valid email')
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

const ResetPasswordValidationRules = () => {
    return [
        body('emailToken')
            .not().isEmpty().withMessage('Email Token is required').bail()
            .isHexadecimal().withMessage('Provide a valid email token')
            .trim(),
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

const ForgotPasswordValidationRules = () => {
    return [
        body('email')
            .not().isEmpty().withMessage('Email is required').bail()
            .isEmail().withMessage('Provide a valid email')
            .normalizeEmail()
            .trim(),
    ]
}

const SignInValidationRules = () => {
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
        body('otp')
            .not().isEmpty().withMessage('OTP is required').bail()
            .isLength({ min: 4, max: 4 }).withMessage('OTP must be 4 digits long').bail()
            .isNumeric().withMessage('OTP must be of type Number').bail()
            .toInt()
    ]
}

export {
    ValidateReqParams,
    SignupValidationRules,
    LoginOtpValidationRules,
    ResetPasswordValidationRules,
    ForgotPasswordValidationRules,
    SignInValidationRules
}