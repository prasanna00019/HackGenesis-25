import Blogs from "../models/BlogModel.js";
import redisClient from "../utils/RedisClient.js";
export const createBlog = async (req, res) => {
    const { title, content,Author } = req.body;
    const newBlog = new Blogs({ title, content ,Author});
    try {
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
export const getAllBlogs = async (req, res) => {
    try {
        const cachedBlogs = await redisClient.get('blogs');
        if (cachedBlogs) {
            res.status(200).json(JSON.parse(cachedBlogs));
            return;
        }
        const blogs = await Blogs.find();
        await redisClient.set('blogs', JSON.stringify(blogs));
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};  
export const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blogs.findById(id);  
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const updateBlogById = async (req, res) => {
    const { id } = req.params;
    const { title, content ,Author} = req.body;
    const updatedBlog = { title,Author, content };
    try {
        await Blogs.findByIdAndUpdate(id, updatedBlog, { new: true });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const deleteBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        await Blogs.findByIdAndRemove(id);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};