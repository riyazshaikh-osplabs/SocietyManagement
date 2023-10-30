import express from "express";
import { SignOut, ResetPassword, ForgotPassword } from "../../controllers/admin.js";
import { ValidateReqParams, ValidateResetPassword } from "../../middlewares/expressValidators.js";
const router = express.Router();

router.post('/signout', SignOut);
router.post('/reset-password', ValidateResetPassword(), ValidateReqParams, ResetPassword);
router.post('/forgot-password', ForgotPassword);

export default router;