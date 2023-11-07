import express from "express";
import { SignUp, SignIn, ForgotPassword, ResetPassword, SendOtp, GetRoomNumbers, GetBuildingWings, GetRoleOfUser } from "../../controllers/admin.js";
import { SignupValidationRules, ValidateReqParams, ForgotPasswordValidationRules, ResetPasswordValidationRules, LoginOtpValidationRules, SignInValidationRules } from "../../middlewares/expressValidators.js";
import { ValidateEmailForSignup, ValidateEmailForSignin, ValidateRoomNumber, ValidateEmailToken } from "../../middlewares/authRequest.js";
const router = express.Router();

router.post('/signup', SignupValidationRules(), ValidateReqParams, ValidateEmailForSignup(true), ValidateRoomNumber, SignUp);
router.post('/signin', SignInValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), SignIn);
router.post('/forgot-password', ForgotPasswordValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), ForgotPassword);
router.post('/reset-password', ResetPasswordValidationRules(), ValidateReqParams, ValidateEmailToken(true), ResetPassword);
router.post('/otp/login', LoginOtpValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), SendOtp);
router.get('/rooms/:bldgId', GetRoomNumbers);
router.get('/wings', GetBuildingWings);
router.get('/roles', GetRoleOfUser);

export default router;