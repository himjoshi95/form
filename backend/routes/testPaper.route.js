import express from "express";

import { addTestPaper } from "../controllers/testPaper.controller.js";

const router = express.Router();

router.post("/",addTestPaper);


export default router;