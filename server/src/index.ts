import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/database';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import blogPostRoutes from './routes/blogPostRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/posts', blogPostRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/api/health', async (_req: Request, res: Response) => {
  try {
      const dbResult = await db.raw('SELECT NOW()');
      res.json({
          status: 'ok',
          db_time: dbResult.rows[0].now
      });
  } catch (error) {
      console.error('Database connection test failed:', error);
      res.status(500).json({
          status: 'error',
          message: 'Failed to connect to the database.'
      });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 