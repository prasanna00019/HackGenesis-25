import express from 'express';
import { streakActivity } from '../controllers/UserControllers.js';
const router=express.Router();
router.post('/streak-activity/:userId',streakActivity);
export default router;