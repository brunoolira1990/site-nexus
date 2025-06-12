import { RequestHandler } from 'express';
import db from '../config/database';

// GET /api/products - Get all products (can be filtered by category_id)
export const getAllProducts: RequestHandler = async (req, res) => {
  const { category_id } = req.query;

  try {
    let query = db('products');

    if (category_id) {
      query = query.where({ category_id: Number(category_id) });
    }
    
    const products = await query.orderBy('name', 'asc');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/products/:id - Get a single product by ID
export const getProductById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db('products').where({ id }).first();
    
    if (!product) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    
    res.json(product);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// POST /api/products - Create a new product
export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, long_description, image_url, category_id, specifications } = req.body;

  if (!name || !category_id) {
    res.status(400).json({ message: 'Product name and category_id are required.' });
    return;
  }

  try {
    const [newProduct] = await db('products').insert({
      name,
      description,
      long_description,
      image_url,
      category_id,
      specifications,
    }).returning('*');
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/products/:id - Update a product
export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  if (!productData.name || !productData.category_id) {
    res.status(400).json({ message: 'Product name and category_id are required.' });
    return;
  }

  try {
    const [updatedProduct] = await db('products')
      .where({ id })
      .update(productData)
      .returning('*');

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    
    res.json(updatedProduct);
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/products/:id - Delete a product
export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db('products').where({ id }).del();
    
    if (count === 0) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 