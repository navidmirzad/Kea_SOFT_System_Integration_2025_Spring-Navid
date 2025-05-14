import dotenv from "dotenv";
dotenv.config();

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  client: "postgresql",
  connection: {
    user: "myuser",
    password: "mypassword",
    database: "mydatabase",
    host: "localhost",
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
