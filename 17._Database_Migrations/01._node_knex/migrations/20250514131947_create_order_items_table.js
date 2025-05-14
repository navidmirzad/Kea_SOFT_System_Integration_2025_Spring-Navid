export function up(knex) {
  return knex.schema
    .createTable("orders", (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("order_items", (table) => {
      table.increments("id");
      table
        .integer("order_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("orders");
      table
        .integer("product_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("products");
      table.integer("quantity").unsigned().notNullable();
    });
}

export function down(knex) {
  return knex.schema.dropTable("order_items").dropTable("orders");
}
