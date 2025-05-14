/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("courses", (table) => {
      table.increments("course_id").notNullable().primary();
      table.string("course_name", 100).notNullable();
      table.string("course_code", 10).notNullable().unique();
      table.integer("credits");
    })
    .createTable("students", (table) => {
      table.increments("student_id").notNullable().primary();
      table.string("first_name", 50).notNullable();
      table.string("last_name", 50).notNullable();
      table.date("birth_date");
      table.string("email", 100).unique();
      table.specificType("enrollment_year", "year");
    })
    .createTable("enrollments", (table) => {
      table.increments("enrollment_id").notNullable().primary();
      table.integer("student_id").index();
      table.foreign("student_id").references("student_id").inTable("students");
      table.integer("course_id").index();
      table.foreign("course_id").references("course_id").inTable("courses");
      table.dateTime("enrollment_date").defaultTo(knex.fn.now());
      table.string("grade", 2);
    });
}

export function down(knex) {
  return knex.schema
    .dropTable("enrollments")
    .dropTable("students")
    .dropTable("courses");
}
