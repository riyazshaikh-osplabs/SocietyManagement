import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASS = process.env.DB_PASS;
export const DB_USER = process.env.DB_USER;
export const DB_MAX_CONNECTIONS_POOL = process.env.DB_MAX_CONNECTIONS_POOL;
export const DB_MIN_CONNECTIONS_POOL = process.env.DB_MIN_CONNECTIONS_POOL;
export const DB_ACCQUIRE_TIME = process.env.DB_ACCQUIRE_TIME;
export const DB_IDLE_TIME = process.env.DB_IDLE_TIME;
export const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG;
export const FIREBASE_KEY = process.env.FIREBASE_KEY;
export const FIREBASE_APP_CONFIG = process.env.FIREBASE_APP_CONFIG
