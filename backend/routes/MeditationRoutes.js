import express from 'express';
import { createMeditation, DeleteMeditationById, getAllMeditations, UpdateMeditationById } from '../controllers/MeditationControllers.js';
const router=express.Router();
router.post('/addMeditation',createMeditation);
router.get('/getAllMeditations',getAllMeditations);
router.put('/updateMeditation/:id',UpdateMeditationById);
router.delete('/deleteMeditation/:id',DeleteMeditationById);
export default router;