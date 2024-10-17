import express from "express";

import { addTestPaper, getSingleTestPaper, getTestPaper } from "../controllers/testPaper.controller.js";

const router = express.Router();

router.post("/",addTestPaper);
router.get("/",getTestPaper);
router.get("/single/:id",getSingleTestPaper);


export default router;