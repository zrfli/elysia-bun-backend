import { SQL } from "bun";

export const db = new SQL({ url: process.env.DATABASE_URL });