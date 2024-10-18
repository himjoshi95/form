import express from "express";

import { addTestPaper, deleteTestPaper, getSingleTestPaper, getTestPaper } from "../controllers/testPaper.controller.js";

const router = express.Router();

router.post("/",addTestPaper);
router.get("/",getTestPaper);
router.get("/single/:id",getSingleTestPaper);
router.delete("/deleteTestPaper/:id",deleteTestPaper);


export default router;