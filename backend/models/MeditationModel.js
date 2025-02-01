import mongoose from "mongoose";

const MeditationModel= new mongoose.Schema({
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
    Guidelines: {
        type: String,
        required: true,
    },
    FAQs: {
        type: String,
        required: true,
    },
    Benefits: {
        type: String,
        required: true,
    },
})
const Meditation = mongoose.model("Meditation", MeditationModel);
export default Meditation