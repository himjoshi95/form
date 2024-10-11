import express from "express";
import { addMaster, allTrainings } from "../controllers/admin.controller.js";

const router = express.Router();

router.post('/addMaster', addMaster);
router.get('/allTrainings', allTrainings);

export default router;