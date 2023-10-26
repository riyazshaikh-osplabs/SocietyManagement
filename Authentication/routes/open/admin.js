import express from "express";
import { SignUp, SignIn } from "../../controllers/admin.js";
import { SignupValidationRules, SiginValidationRules, ValidateReqParams } from "../../middlewares/expressValidators.js";
import { ValidateEmailForSignup, ValidateEmailForSignin } from "../../middlewares/authRequest.js";
const router = express.Router();

router.post('/signup', SignupValidationRules(), ValidateReqParams, ValidateEmailForSignup(true), SignUp);
router.post('/signin', SiginValidationRules(), ValidateReqParams, ValidateEmailForSignin(true), SignIn);

export default router;