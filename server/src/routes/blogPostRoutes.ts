import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/blogPostController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes (require admin access)
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router; 