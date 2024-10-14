import express from "express";
import { addMaster, allTrainings, updateStatus } from "../controllers/admin.controller.js";

const router = express.Router();

router.post('/addMaster', addMaster);
router.get('/allTrainings', allTrainings);
router.patch('/update-status',updateStatus);

export default router;