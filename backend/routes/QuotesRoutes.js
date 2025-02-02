import express from 'express'
import { AddQuotes, getAllQuotes, getQuoteById } from '../controllers/QuotesController.js';
const router=express.Router();
router.post('/Add-quote',AddQuotes);
router.get('/all-quotes',getAllQuotes);
router.get('/quote-by-id/:id',getQuoteById);
export default router;