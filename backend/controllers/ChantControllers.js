import Chants from "../models/ChantModel.js";
import redisClient from "../utils/RedisClient.js";
export const getAllChants=async(req,res)=>{
    try {
        const cachedChants=await redisClient.get('chants');
        if(cachedChants){
            res.status(200).json(JSON.parse(cachedChants));
            return;
        }
        const chant=await Chants.find();
        await redisClient.set('chants',JSON.stringify(chant));
        res.status(200).json(chant);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const createChant=async(req,res)=>{
    const {title,description,link}=req.body;
    const newChant=new Chants({title,description,link});
    try {
        await newChant.save();
        res.status(201).json(newChant);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}
export const UpdateChantById=async(req,res)=>{
    const {id}=req.params;
    const {title,description,link}=req.body;
    const updatedChant={title,description,link};
    try {
        await Chants.findByIdAndUpdate(id,updatedChant,{new:true});
        res.status(200).json(updatedChant);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const DeleteChantById=async(req,res)=>{
    const {id}=req.params;
    try {
        await Chants.findByIdAndRemove(id);
        res.json({message:"Chant deleted successfully"});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
