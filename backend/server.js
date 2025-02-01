import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import AuthRoutes from './routes/AuthRoutes.js';
import YogaRoutes from './routes/YogaRoutes.js';
import MeditationRoutes from './routes/MeditationRoutes.js';
import ChantRoutes from './routes/ChantRoutes.js';
import BlogRoutes from './routes/BlogRoutes.js';
import JournalRoutes from './routes/JournalRoutes.js';
import http from 'http';
dotenv.config()
import cors from 'cors';
import helment from 'helmet';
import connectDB from './DB/connectDB.js';
const app=express();
const server=http.createServer(app);
app.use(cors({
        origin:"http://localhost:5180",
        credentials:true
    }));
app.use(helment());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/auth',AuthRoutes);
app.use('/api/Yoga',YogaRoutes);
app.use('/api/Meditation',MeditationRoutes);
app.use('/api/Chants',ChantRoutes);
app.use('/api/Blogs',BlogRoutes);
app.use('/api/Journal',JournalRoutes);
server.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`server is running on port ${process.env.PORT}`);
});