import { RedisClient } from "bun";

export const redis = new RedisClient(process.env.REDIS_URL);