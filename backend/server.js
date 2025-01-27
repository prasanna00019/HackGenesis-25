import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import AuthRoutes from './routes/AuthRoutes.js';
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
server.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`server is running on port ${process.env.PORT}`);
});