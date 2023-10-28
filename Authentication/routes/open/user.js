import express from "express";
import { SignUp, SignIn } from "../../controllers/user.js";
import { SiginValidationRules, SignupValidationRules, ValidateReqParams } from "../../middlewares/expressValidators.js";
import { ValidateEmailForSignin, ValidateEmailForSignup, ValidateRoomNumber } from "../../middlewares/authRequest.js";
const router = express.Router();

router.post('/signup', SignupValidationRules(), ValidateReqParams, ValidateEmailForSignup(false), ValidateRoomNumber, SignUp);
router.post('/signin', SiginValidationRules(), ValidateReqParams, ValidateEmailForSignin(false), SignIn);

export default router;