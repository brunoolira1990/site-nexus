import { RequestHandler } from 'express';
import db from '../config/database';

// GET /api/products - Lista todos os produtos com paginação e busca
export const getAllProducts: RequestHandler = async (req, res): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || '';

    const baseQuery = db('products')
      .leftJoin('categories', 'products.category_id', 'categories.id')
      .select(
        'products.id',
        'products.name',
        'products.description',
        'products.long_description',
        'products.image_url',
        'products.specifications',
        'products.category_id',
        'categories.name as category_name'
      );

    if (search) {
      baseQuery.where('products.name', 'ilike', `%${search}%`);
    }

    const totalQuery = baseQuery.clone().clearSelect().count({ count: '*' }).first();
    const totalResult = await totalQuery;
    const total = Number(totalResult?.count || 0);

    const products = await baseQuery
      .orderBy('products.name', 'asc')
      .limit(limit)
      .offset((page - 1) * limit);

    res.json({ products, total });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
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

// POST /api/products - Cria um novo produto
export const createProduct: RequestHandler = async (req, res): Promise<void> => {
  const { name, description, long_description, image_url, specifications, category_id } = req.body;

  if (!name || !category_id) {
    res.status(400).json({ message: 'Nome e categoria são obrigatórios.' });
    return;
  }

  try {
    const [newProduct] = await db('products')
      .insert({ name, description, long_description, image_url, specifications, category_id })
      .returning('*');
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// PUT /api/products/:id - Atualiza um produto existente
export const updateProduct: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;
  const { name, description, long_description, image_url, specifications, category_id } = req.body;

  if (!name || !category_id) {
    res.status(400).json({ message: 'Nome e categoria são obrigatórios.' });
    return;
  }

  try {
    const [updatedProduct] = await db('products')
      .where({ id })
      .update({ name, description, long_description, image_url, specifications, category_id })
      .returning('*');

    if (!updatedProduct) {
      res.status(404).json({ message: 'Produto não encontrado.' });
      return;
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// DELETE /api/products/:id - Remove um produto
export const deleteProduct: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    const count = await db('products').where({ id }).del();
    if (count === 0) {
      res.status(404).json({ message: 'Produto não encontrado.' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}; 