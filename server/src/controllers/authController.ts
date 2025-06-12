import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database';

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required.' });
    return;
  }

  try {
    const user = await db('users').where({ username }).first();

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET environment variable is not set.');
      res.status(500).json({ message: 'Internal server configuration error.' });
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 