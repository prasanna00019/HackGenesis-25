import mongoose from "mongoose";
const BlogsModel= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    image:{
        type: String,    
        default:"" 
    }
})
const Blogs = mongoose.model("Blogs", BlogsModel);
export default Blogs;