"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const database_1 = __importDefault(require("../config/database"));
// GET /api/posts - Get all blog posts
const getAllPosts = async (_req, res) => {
    try {
        const result = await database_1.default.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllPosts = getAllPosts;
// GET /api/posts/:id - Get a single blog post by ID
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.default.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Blog post not found.' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(`Error fetching blog post ${id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getPostById = getPostById;
// POST /api/posts - Create a new blog post
const createPost = async (req, res) => {
    const { title, content, author_id, image_url } = req.body;
    if (!title || !content || !author_id) {
        res.status(400).json({ message: 'Title, content, and author_id are required.' });
        return;
    }
    try {
        const result = await database_1.default.query('INSERT INTO blog_posts (title, content, author_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *', [title, content, author_id, image_url]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createPost = createPost;
// PUT /api/posts/:id - Update a blog post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, image_url } = req.body;
    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required.' });
        return;
    }
    try {
        const result = await database_1.default.query('UPDATE blog_posts SET title = $1, content = $2, image_url = $3, updated_at = NOW() WHERE id = $4 RETURNING *', [title, content, image_url, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Blog post not found.' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error(`Error updating blog post ${id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updatePost = updatePost;
// DELETE /api/posts/:id - Delete a blog post
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await database_1.default.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Blog post not found.' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error(`Error deleting blog post ${id}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deletePost = deletePost;
//# sourceMappingURL=blogPostController.js.map