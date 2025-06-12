"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogPostController_1 = require("../controllers/blogPostController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Public routes
router.get('/', blogPostController_1.getAllPosts);
router.get('/:id', blogPostController_1.getPostById);
// Protected routes (require admin access)
router.post('/', authMiddleware_1.protect, blogPostController_1.createPost);
router.put('/:id', authMiddleware_1.protect, blogPostController_1.updatePost);
router.delete('/:id', authMiddleware_1.protect, blogPostController_1.deletePost);
exports.default = router;
//# sourceMappingURL=blogPostRoutes.js.map