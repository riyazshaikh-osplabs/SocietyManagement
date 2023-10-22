import express from "express";
import adminRoute from "./admin.js";
import userRoute from "./user.js";
const router = express.Router();
// const { ValidateClaims } = require('../../middlewares/authRequest');

router.use('/admin', adminRoute);
router.use('/user', userRoute);

export default router;