"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = void 0;
const database_1 = __importDefault(require("../config/database"));
// GET /api/categories - Get all categories
const getAllCategories = async (_req, res) => {
    try {
        const result = await database_1.default.query('SELECT * FROM categories ORDER BY name ASC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllCategories = getAllCategories;
// POST /api/categories - Create a new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: 'Category name is required.' });
        return;
    }
    try {
        const result = await database_1.default.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        if (error.code === '23505') { // Unique violation
            res.status(409).json({ message: 'Category with this name already exists.' });
            return;
        }
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createCategory = createCategory;
// PUT /api/categories/:id - Update a category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: 'Category name is required.' });
        return;
    }
    try {
        const result = await database_1.default.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Category not found.' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        if (error.code === '23505') {
            res.status(409).json({ message: 'Category with this name already exists.' });
            return;
        }
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateCategory = updateCategory;
// DELETE /api/categories/:id - Delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.default.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Category not found.' });
            return;
        }
        res.status(204).send(); // No Content
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map