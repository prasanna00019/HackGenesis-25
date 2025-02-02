import mongoose from "mongoose";
const QuotesModel= new mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image:{
        type: String,    
        default:""
    }
});
const Quotes = mongoose.model("Quotes", QuotesModel);
export default Quotes;