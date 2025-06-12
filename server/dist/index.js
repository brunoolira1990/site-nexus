"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const blogPostRoutes_1 = __importDefault(require("./routes/blogPostRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/posts', blogPostRoutes_1.default);
app.get('/', (_req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/api/health', async (_req, res) => {
    try {
        const dbResult = await database_1.default.query('SELECT NOW()');
        res.json({
            status: 'ok',
            db_time: dbResult.rows[0].now
        });
    }
    catch (error) {
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
//# sourceMappingURL=index.js.map