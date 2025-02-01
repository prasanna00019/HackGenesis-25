import mongoose from "mongoose";

const ChantsModel= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
})
const Chants = mongoose.model("Chants", ChantsModel);
export default Chants