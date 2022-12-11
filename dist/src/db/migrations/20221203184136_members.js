"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable("members", (table) => {
        table.uuid("member_id").unique().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table.boolean("active_status").notNullable().defaultTo(true);
        table.date("joined_date").notNullable().defaultTo(knex.fn.now());
        table.string("hash_key").notNullable();
        table.enu("role", ["member", "admin"]).notNullable().defaultTo("member");
        table.timestamps(true, true);
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("members");
}
exports.down = down;
