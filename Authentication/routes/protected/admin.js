import express from "express";
const router = express.Router();
import { SignUp } from "../../controllers/admin.js";
// const { ValidateClaims } = require('../../middlewares/authRequest');

router.post('/signup', SignUp);

export default router;