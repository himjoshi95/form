import express from "express";
import { addMaster, allTrainings, checkAuth, login, logout, signup, updateStatus } from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

router.post('/addMaster', addMaster);
router.get('/allTrainings', allTrainings);
router.patch('/update-status',updateStatus);

export default router;