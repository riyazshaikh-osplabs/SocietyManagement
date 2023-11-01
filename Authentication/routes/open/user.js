import express from "express";
import { SignUp, SignIn, ForgotPassword, ResetPassword, SendOtp } from "../../controllers/user.js";
import { SignupValidationRules, ValidateReqParams, ForgotPasswordValidationRules, ResetPasswordValidationRules, LoginOtpValidationRules, SignInValidationRules } from "../../middlewares/expressValidators.js";
import { ValidateEmailForSignup, ValidateEmailForSignin, ValidateRoomNumber, ValidateEmailToken, ValidateOtp } from "../../middlewares/authRequest.js";
const router = express.Router();

router.post('/signup', SignupValidationRules(), ValidateReqParams, ValidateEmailForSignup(false), ValidateRoomNumber, SignUp);
router.post('/signin', SignInValidationRules(), ValidateReqParams, ValidateEmailForSignin(false), ValidateOtp, SignIn);
router.post('/forgot-password', ForgotPasswordValidationRules(), ValidateReqParams, ValidateEmailForSignin(false), ForgotPassword);
router.post('/reset-password', ResetPasswordValidationRules(), ValidateReqParams, ValidateEmailToken(false), ResetPassword);
router.post('/otp/login', LoginOtpValidationRules(), ValidateReqParams, ValidateEmailForSignin(false), SendOtp);

export default router;