import express from "express";
import { addMaster, addNewTraining, addTrainer, allTrainers, allTrainings, checkAuth, login, logout, signup, trainerDetails, trainingDetails, trainingDropdown, updateStatus, updateTraining } from "../controllers/admin.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);

//admin can only addMaster (add Training)
router.post('/addMaster',verifyToken ,addMaster);

//admin can only addTrainer (add New Trainers)
router.post('/addTrainer',verifyToken,addTrainer);
//admin can only see allTrainers
router.get('/allTrainers',verifyToken,allTrainers);

//admin can only view TrainerDetails
router.get('/trainerDetails/:id',verifyToken,trainerDetails);

//admin gets dropdown for trainings except current
router.get('/trainingDropdown/:id',verifyToken,trainingDropdown);

//admin gets to add new trainings for the tutor
router.patch('/addNewTraining/:id',verifyToken,addNewTraining);

router.get('/allTrainings',verifyToken ,allTrainings);
router.patch('/update-status',updateStatus);

router.get('/trainingDetails',trainingDetails);
//Update all trainings status
router.patch('/update-training',updateTraining);

export default router;