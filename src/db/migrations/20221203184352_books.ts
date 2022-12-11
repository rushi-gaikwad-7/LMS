import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("books", (table) => {
    table.uuid("book_id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.string("category").notNullable().defaultTo("Fantasy");
    table.boolean("availablity").notNullable().defaultTo(true);
    table.integer("publish_year").notNullable();
    table.integer("rating").notNullable().defaultTo(1);
    table.string("lib_book_id").notNullable().unique();
    table.string("language").notNullable();
    table.integer("pages").notNullable();
    table.string("cover");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("books");
}
