import express from "express";
import adminRoute from "./admin.js";
import userRoute from "./user.js";
import { ValidateClaims } from "../../middlewares/authRequest.js";
const router = express.Router();

router.use('/admin', ValidateClaims(true), adminRoute);
// router.use('/user', ValidateClaims(false), userRoute);

export default router;