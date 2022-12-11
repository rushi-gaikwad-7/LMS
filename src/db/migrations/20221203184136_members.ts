import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("members");
}
