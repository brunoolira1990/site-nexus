import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
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

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('blog_posts');
    pgm.dropTable('products');
    pgm.dropTable('categories');
    pgm.dropTable('users');
} 