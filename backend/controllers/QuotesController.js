import Quotes from "../models/QuotesModel.js";
import redisClient from "../utils/RedisClient.js";

export const AddQuotes = async (req, res) => {
 try{
   const {quote,author,image}=req.body;
   const newQuote=new Quotes({quote,author,image});
   await newQuote.save();
   res.status(201).json(newQuote);
 }
 catch(error){
  console.log(error); 
}
}
export const getQuoteById = async (req, res) => {
 try{
  const {id}=req.params;
  const quote=await Quotes.findById(id);
  res.status(200).json(quote);
 }
 catch(error){
  console.log(error); 
 }
}
export const getAllQuotes = async (req, res) => {
  try {
    const cachedQuotes = await redisClient.get('quotes');
    if (cachedQuotes) {
      return res.status(200).json(JSON.parse(cachedQuotes));
    }

    const quotes = await Quotes.find();
    await redisClient.set('quotes', JSON.stringify(quotes));
    return res.status(200).json(quotes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteQuoteById=async(req,res)=>{
  try {
  }
  catch(err){
    console.log(err);
  }
}
export const updateQuoteById=async(req,res)=>{
  try {
  }
  catch(err){
    console.log(err);
  }
}