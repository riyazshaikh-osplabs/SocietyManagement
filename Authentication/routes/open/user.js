import express from "express";
const router = express.Router();
import { SignUp } from "../../controllers/user.js";

router.post('/signup', SignUp);

export default router;