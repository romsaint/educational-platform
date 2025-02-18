import { Client } from "pg";
import { config } from "dotenv";
config()

const port = process.env.DB_PORT !== undefined ? Number(process.env.DB_PORT) : 5432;

export const client = new Client({
    host: process.env.DB_HOST ?? 'localhost',
    database: process.env.DB_DATABASE,
    port: port,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER || 'postgres'
})