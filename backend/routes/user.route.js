import express from "express";
import { allUsers, filterEmail, formData, getCertificate, searchMobile, submitFeedback, testDetails, userDetails } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/form',formData);
router.get('/searchMobile',searchMobile);
router.get('/filterEmail',filterEmail);
router.get('/userDetails',userDetails);

router.post('/testDetails',testDetails);

router.post('/submitFeedback',submitFeedback);

router.get('/certificate',getCertificate);

router.get('/allUsers',verifyToken,allUsers);



export default router;