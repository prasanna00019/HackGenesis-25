import express from 'express';
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlogById } from '../controllers/BlogControllers.js';
const router=express.Router();
router.post('/create-blog',createBlog);
router.get('/get-all-blogs',getAllBlogs);
router.get('/get-blog/:id',getBlogById);
router.put('/update-blog/:id',updateBlogById);
router.delete('/delete-blog/:id',deleteBlogById);
export default router;