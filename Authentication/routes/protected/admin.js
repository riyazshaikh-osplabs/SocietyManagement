import express from "express";
import { SignOut } from "../../controllers/admin.js";
const router = express.Router();

router.post('/signout', SignOut);

export default router;