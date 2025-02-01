import express from 'express';
import { createYoga, DeleteYogaById, getAllYoga, UpdateYogaById } from '../controllers/YogaControllers.js';
const router=express.Router();
router.post('/create-yoga',createYoga);
router.get('/get-all-yoga', getAllYoga);
router.put('/update-yoga/:id',UpdateYogaById);
router.delete('/delete-yoga/:id', DeleteYogaById);
export default router;