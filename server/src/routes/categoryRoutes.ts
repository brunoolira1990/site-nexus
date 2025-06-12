import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Rota pública para buscar todas as categorias
router.get('/', categoryController.getAllCategories);

// Rotas protegidas que exigem autenticação
router.post('/', protect, categoryController.createCategory);
router.put('/:id', protect, categoryController.updateCategory);
router.delete('/:id', protect, categoryController.deleteCategory);

export default router; 