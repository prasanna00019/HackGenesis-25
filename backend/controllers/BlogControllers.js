import Blogs from "../models/BlogModel.js";
import redisClient from "../utils/RedisClient.js";
export const createBlog = async (req, res) => {
    const { title, content,Author ,image} = req.body;
    const newBlog = new Blogs({ title, content ,Author,image});
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
        const cachedBlog = await redisClient.get(`blog:${id}`);
        if (cachedBlog) {
            res.status(200).json(JSON.parse(cachedBlog));
            return;
        }
        const blog = await Blogs.findById(id);  
        await redisClient.set(`blog:${id}`, JSON.stringify(blog));
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