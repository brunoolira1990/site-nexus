"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const createAdmin = async () => {
    const [username, password] = process.argv.slice(2);
    if (!username || !password) {
        console.error('Usage: ts-node src/scripts/create-admin.ts <username> <password>');
        process.exit(1);
    }
    console.log(`Creating admin user: ${username}`);
    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
        const result = await database_1.default.query('INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username', [username, passwordHash]);
        console.log('Admin user created successfully:');
        console.log(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
    finally {
        database_1.default.end();
    }
};
createAdmin();
//# sourceMappingURL=create-admin.js.map