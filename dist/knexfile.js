"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_PATH = path_1.default.join(__dirname, "src", "db");
const DB_PORT = Number(process.env.DB_PORT);
const config = {
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
            directory: path_1.default.join(BASE_PATH, "migrations"),
        },
        seeds: {
            directory: path_1.default.join(BASE_PATH, "seeds"),
        },
    },
};
exports.default = config;
