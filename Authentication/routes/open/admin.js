import express from "express";
import { SignUp, SignIn, ForgotPassword, ResetPassword } from "../../controllers/admin.js";
import { SignupValidationRules, SiginValidationRules, ValidateReqParams, ForgotPasswordValidationRules } from "../../middlewares/expressValidators.js";
import { ValidateEmailForSignup, ValidateEmailForSignin, ValidateRoomNumber, ValidateCredentials } from "../../middlewares/authRequest.js";
const router = express.Router();

router.post('/signup', SignupValidationRules(), ValidateReqParams, ValidateEmailForSignup(true), ValidateRoomNumber, SignUp);
router.post('/signin', SiginValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), SignIn);
router.post('/forgot-password', ForgotPasswordValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), ForgotPassword);
router.get('/reset-password/:userId', ValidateCredentials, ResetPassword);

export default router;