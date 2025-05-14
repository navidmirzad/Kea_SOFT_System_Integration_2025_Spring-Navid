import "dotenv/config";

/**
 * @type { import("knex").Knex.Config }
 */
export default {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
