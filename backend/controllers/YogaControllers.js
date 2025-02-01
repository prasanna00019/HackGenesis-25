import dotenv from 'dotenv';
import Yoga from '../models/YogaModel.js';
import redisClient from '../utils/RedisClient.js';
dotenv.config();
export const getAllYoga=async(req,res)=>{
    try {
        const cachedYoga=await redisClient.get('yoga');
        if(cachedYoga){
            res.status(200).json(JSON.parse(cachedYoga));
            return;
        }
        const yoga=await Yoga.find();
        await redisClient.set('yoga',JSON.stringify(yoga));
        res.status(200).json(yoga);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const createYoga=async(req,res)=>{
    const {title,description,link,Guidelines,FAQs,Benefits}=req.body;
    const newYoga=new Yoga({title,description,link,Guidelines,FAQs,Benefits});
    try {
        await newYoga.save();
        res.status(201).json(newYoga);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}
export const UpdateYogaById=async(req,res)=>{
    const {id}=req.params;
    const {title,description,link,Guidelines,FAQs,Benefits}=req.body;
    const updatedYoga={title,description,link,Guidelines,FAQs,Benefits};
    try {
        await Yoga.findByIdAndUpdate(id,updatedYoga,{new:true});
        res.status(200).json(updatedYoga);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const DeleteYogaById=async(req,res)=>{
    const {id}=req.params;
    try {
        await Yoga.findByIdAndRemove(id);
        res.json({message:"Yoga deleted successfully"});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}