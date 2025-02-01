import mongoose from "mongoose";
const YogaModel= new mongoose.Schema({
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
const Yoga = mongoose.model("Yoga", YogaModel);
export default Yoga;