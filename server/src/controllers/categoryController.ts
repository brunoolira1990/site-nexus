import { RequestHandler } from 'express';
import db from '../config/database';

// GET /api/categories - Get all categories
export const getAllCategories: RequestHandler = async (_req, res) => {
  try {
    const categories = await db('categories').orderBy('name', 'asc');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/categories - Create a new category
export const createCategory: RequestHandler = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Category name is required.' });
    return;
  }

  try {
    const [newCategory] = await db('categories').insert({ name }).returning('*');
    res.status(201).json(newCategory);
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      res.status(409).json({ message: 'Category with this name already exists.' });
      return;
    }
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/categories/:id - Update a category
export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Category name is required.' });
    return;
  }

  try {
    const [updatedCategory] = await db('categories').where({ id }).update({ name }).returning('*');

    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    
    res.json(updatedCategory);
  } catch (error: any) {
    if (error.code === '23505') {
        res.status(409).json({ message: 'Category with this name already exists.' });
        return;
    }
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/categories/:id - Delete a category
export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db('categories').where({ id }).del();
    
    if (count === 0) {
        res.status(404).json({ message: 'Category not found.' });
        return;
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 