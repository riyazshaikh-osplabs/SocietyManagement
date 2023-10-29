import express from "express";
import { SignOut, ResetPassword } from "../../controllers/admin.js";
import { ValidateReqParams, ValidateResetPassword } from "../../middlewares/expressValidators.js";
const router = express.Router();

router.post('/signout', SignOut);
router.post('/reset-password', ValidateResetPassword(), ValidateReqParams, ResetPassword);

export default router;