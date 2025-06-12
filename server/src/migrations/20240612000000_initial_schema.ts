import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username', 255).notNullable().unique();
        table.text('password_hash').notNullable();
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.integer('category_id').notNullable().references('id').inTable('categories').onDelete('CASCADE');
        table.string('name', 255).notNullable();
        table.text('description');
        table.text('long_description');
        table.string('image_url', 255);
        table.jsonb('specifications');
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('blog_posts', (table) => {
        table.increments('id').primary();
        table.integer('author_id').notNullable().references('id').inTable('users').onDelete('SET NULL');
        table.string('title', 255).notNullable();
        table.text('content');
        table.string('image_url', 255);
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    // Drop in reverse order of creation
    await knex.schema.dropTableIfExists('blog_posts');
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('users');
} 