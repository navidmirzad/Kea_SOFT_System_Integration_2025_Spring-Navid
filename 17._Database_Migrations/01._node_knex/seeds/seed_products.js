/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  //await knex("products").del();

  // Inserts seed entries
  await knex("products").insert([
    { id: 1, price: 19.99, name: "Wireless Mouse" },
    { id: 2, price: 49.99, name: "Mechanical Keyboard" },
    { id: 3, price: 299.99, name: "27-inch Monitor" },
  ]);
}