import express from 'express'
import { createChant, DeleteChantById, getAllChants, UpdateChantById } from '../controllers/ChantControllers.js';
const router=express.Router();
router.post('/addChant',createChant);
router.get('/getAllChants',getAllChants);
router.put('/updateChant/:id',UpdateChantById);
router.delete('/deleteChant/:id',DeleteChantById);
export default router;