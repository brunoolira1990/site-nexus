"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const database_1 = __importDefault(require("../config/database"));
// GET /api/products - Get all products (can be filtered by category_id)
const getAllProducts = async (req, res) => {
    const { category_id } = req.query;
    try {
        let query = 'SELECT * FROM products';
        const queryParams = [];
        if (category_id) {
            query += ' WHERE category_id = $1';
            queryParams.push(category_id);
        }
        query += ' ORDER BY name ASC';
        const result = await database_1.default.query(query, queryParams);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllProducts = getAllProducts;
// GET /api/products/:id - Get a single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.default.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getProductById = getProductById;
// POST /api/products - Create a new product
const createProduct = async (req, res) => {
    const { name, description, long_description, image_url, category_id, specifications } = req.body;
    if (!name || !category_id) {
        res.status(400).json({ message: 'Product name and category_id are required.' });
        return;
    }
    try {
        const result = await database_1.default.query('INSERT INTO products (name, description, long_description, image_url, category_id, specifications) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, description, long_description, image_url, category_id, specifications]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createProduct = createProduct;
// PUT /api/products/:id - Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, long_description, image_url, category_id, specifications } = req.body;
    if (!name || !category_id) {
        res.status(400).json({ message: 'Product name and category_id are required.' });
        return;
    }
    try {
        const result = await database_1.default.query(`UPDATE products 
       SET name = $1, description = $2, long_description = $3, image_url = $4, category_id = $5, specifications = $6 
       WHERE id = $7 RETURNING *`, [name, description, long_description, image_url, category_id, specifications, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(`Error updating product ${id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateProduct = updateProduct;
// DELETE /api/products/:id - Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.default.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }
        res.status(204).send(); // No Content
    }
    catch (error) {
        console.error(`Error deleting product ${id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map