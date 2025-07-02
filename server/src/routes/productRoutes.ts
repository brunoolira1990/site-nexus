import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Protect all product routes
router.use(protect);

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router; 