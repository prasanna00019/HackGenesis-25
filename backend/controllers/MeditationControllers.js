import Meditation from '../models/MeditationModel.js';
import redisClient from '../utils/RedisClient.js';
export const getAllMeditations=async(req,res)=>{
    try {
        const cachedMeditations=await redisClient.get('meditations');
        if(cachedMeditations){
            res.status(200).json(JSON.parse(cachedMeditations));
            return;
        }
        const meditation=await Meditation.find();
        await redisClient.set('meditations',JSON.stringify(meditation));
        res.status(200).json(meditation);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const createMeditation=async(req,res)=>{    
    const {title,description,link,Guidelines,FAQs,Benefits}=req.body;
    const newMeditation=new Meditation({title,description,link,Guidelines,FAQs,Benefits});
    try {
        await newMeditation.save();
        res.status(201).json(newMeditation);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}
export const UpdateMeditationById=async(req,res)=>{
    const {id}=req.params;
    const {title,description,link,Guidelines,FAQs,Benefits}=req.body;
    const updatedMeditation={title,description,link,Guidelines,FAQs,Benefits};
    try {
        await Meditation.findByIdAndUpdate(id,updatedMeditation,{new:true});
        res.status(200).json(updatedMeditation);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const DeleteMeditationById=async(req,res)=>{
    const {id}=req.params;
    try {
        await Meditation.findByIdAndRemove(id);
        res.json({message:"Meditation deleted successfully"});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}