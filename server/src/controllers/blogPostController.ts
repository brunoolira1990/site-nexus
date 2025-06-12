import { RequestHandler } from 'express';
import db from '../config/database';

// GET /api/posts - Get all blog posts
export const getAllPosts: RequestHandler = async (_req, res) => {
  try {
    const posts = await db('blog_posts').orderBy('created_at', 'desc');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/posts/:id - Get a single blog post by ID
export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db('blog_posts').where({ id }).first();
    
    if (!post) {
      res.status(404).json({ message: 'Blog post not found.' });
      return;
    }
    
    res.json(post);
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/posts - Create a new blog post
export const createPost: RequestHandler = async (req, res) => {
  const { title, content, author_id, image_url } = req.body;

  if (!title || !content || !author_id) {
    res.status(400).json({ message: 'Title, content, and author_id are required.' });
    return;
  }

  try {
    const [newPost] = await db('blog_posts')
      .insert({ title, content, author_id, image_url })
      .returning('*');
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/posts/:id - Update a blog post
export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: 'Title and content are required.' });
    return;
  }

  try {
    const [updatedPost] = await db('blog_posts')
      .where({ id })
      .update({ title, content, image_url, updated_at: new Date() })
      .returning('*');

    if (!updatedPost) {
      res.status(404).json({ message: 'Blog post not found.' });
      return;
    }
    
    res.json(updatedPost);
  } catch (error) {
    console.error(`Error updating blog post ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/posts/:id - Delete a blog post
export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db('blog_posts').where({ id }).del();
    
    if (count === 0) {
      res.status(404).json({ message: 'Blog post not found.' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting blog post ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 