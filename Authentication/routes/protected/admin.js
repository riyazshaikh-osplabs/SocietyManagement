import express from "express";
import { SignOut, ResetPassword } from "../../controllers/admin.js";
const router = express.Router();

router.post('/signout', SignOut);
router.post('/reset-password', ResetPassword);

export default router;