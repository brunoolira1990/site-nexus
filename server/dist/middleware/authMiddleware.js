"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => {
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
        const payload = jsonwebtoken_1.default.verify(token, secret);
        // Anexamos o payload do usuário ao objeto req para uso em rotas posteriores
        req.user = payload;
        next();
    }
    catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map