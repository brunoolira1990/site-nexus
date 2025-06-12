"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required.' });
        return;
    }
    try {
        const userResult = await database_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return;
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is not set.');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map