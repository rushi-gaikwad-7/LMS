"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable("member_books", (table) => {
        table.uuid("loan_id").unique().defaultTo(knex.raw("gen_random_uuid()"));
        table.date("loan_date").notNullable().defaultTo(knex.fn.now());
        table.boolean("book_return_status").defaultTo(false);
        table.uuid("book_id").references("book_id").inTable("books");
        table.uuid("member_id").references("member_id").inTable("members");
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("member_books");
}
exports.down = down;
