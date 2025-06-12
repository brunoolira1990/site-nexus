import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estendendo a interface Request do Express para incluir nossa propriedade 'user'
declare global {
  namespace Express {
    export interface Request {
      user?: { id: number; username: string };
    }
  }
}

export const protect: (req: Request, res: Response, next: NextFunction) => void = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided.' });
    return;
  }

  const token = bearer.split(' ')[1].trim();
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set.');
  }

  try {
    const payload = jwt.verify(token, secret);
    // Anexamos o payload do usuário ao objeto req para uso em rotas posteriores
    req.user = payload as { id: number; username: string };
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token.' });
  }
}; 