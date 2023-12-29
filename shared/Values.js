import dotenv from 'dotenv';
dotenv.config();
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN