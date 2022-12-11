import type { Knex } from "knex";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const BASE_PATH = path.join(__dirname, "src", "db");
const DB_PORT = Number(process.env.DB_PORT);
const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: DB_PORT,
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
};

export default config;
