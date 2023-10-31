import express from "express";
import { SignUp, SignIn, ForgotPassword, ResetPassword } from "../../controllers/admin.js";
import { SignupValidationRules, SiginValidationRules, ValidateReqParams, ForgotPasswordValidationRules, ResetPasswordValidationRules } from "../../middlewares/expressValidators.js";
import { ValidateEmailForSignup, ValidateEmailForSignin, ValidateRoomNumber, ValidateEmailToken } from "../../middlewares/authRequest.js";
const router = express.Router();

router.post('/signup', SignupValidationRules(), ValidateReqParams, ValidateEmailForSignup(true), ValidateRoomNumber, SignUp);
router.post('/signin', SiginValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), SignIn);
router.post('/forgot-password', ForgotPasswordValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), ForgotPassword);
router.post('/reset-password', ResetPasswordValidationRules(), ValidateReqParams, ValidateEmailToken(true), ResetPassword);

export default router;