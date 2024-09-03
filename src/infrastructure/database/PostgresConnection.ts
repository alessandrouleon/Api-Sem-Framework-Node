import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export class PostgresConnection {
    private static instance: Pool;

    private constructor() { }

    static getInstance(): Pool {
        if (!PostgresConnection.instance) {
            PostgresConnection.instance = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: Number(process.env.POSTGRES_PORT)
            });
        }
        return PostgresConnection.instance;
    }
}
