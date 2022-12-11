import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("member_books", (table) => {
    table.uuid("loan_id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    table.date("loan_date").notNullable().defaultTo(knex.fn.now());
    table.boolean("book_return_status").defaultTo(false);
    table.uuid("book_id").references("book_id").inTable("books");
    table.uuid("member_id").references("member_id").inTable("members");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("member_books");
}
