"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shorthands = void 0;
exports.up = up;
exports.down = down;
exports.shorthands = undefined;
async function up(pgm) {
    // Create the users table
    pgm.createTable('users', {
        id: 'id',
        username: { type: 'varchar(255)', notNull: true, unique: true },
        password_hash: { type: 'text', notNull: true },
        created_at: {
            type: 'timestamp with time zone',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    // Create the categories table
    pgm.createTable('categories', {
        id: 'id',
        name: { type: 'varchar(255)', notNull: true, unique: true },
        created_at: {
            type: 'timestamp with time zone',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    // Create the products table
    pgm.createTable('products', {
        id: 'id',
        category_id: {
            type: 'integer',
            notNull: true,
            references: '"categories"',
            onDelete: 'CASCADE',
        },
        name: { type: 'varchar(255)', notNull: true },
        description: { type: 'text' },
        long_description: { type: 'text' },
        image_url: { type: 'varchar(255)' },
        specifications: { type: 'jsonb' },
        created_at: {
            type: 'timestamp with time zone',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    // Create the blog_posts table
    pgm.createTable('blog_posts', {
        id: 'id',
        author_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'SET NULL',
        },
        title: { type: 'varchar(255)', notNull: true },
        content: { type: 'text' },
        image_url: { type: 'varchar(255)' },
        created_at: {
            type: 'timestamp with time zone',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
}
async function down(pgm) {
    pgm.dropTable('blog_posts');
    pgm.dropTable('products');
    pgm.dropTable('categories');
    pgm.dropTable('users');
}
//# sourceMappingURL=1678886400000_initial-schema.js.map