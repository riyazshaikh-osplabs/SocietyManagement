import express from "express";
const router = express.Router();
import adminRoute from "./admin.js";
import userRoute from "./user.js";

router.use('/admin', adminRoute);
router.use('/user', userRoute);

export default router;