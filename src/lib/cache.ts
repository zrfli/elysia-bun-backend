import { redis } from "../lib/redis";

export const getCache = async (key: string) => {
  try {
    const cachedData = await redis.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
};

export const setCache = async (key: string, data: any, expirationTime: number) => {
  try {
    await redis.set(key, JSON.stringify(data), 'EX', expirationTime);
  } catch (error) {
    console.error("Redis set error:", error);
  }
};

export const deleteCache = async (key: string) => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis delete error:", error);
  }
};