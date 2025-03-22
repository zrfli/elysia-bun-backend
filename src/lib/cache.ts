import { redis } from "../lib/redis";

export const getCache = async (key: string, isObject: boolean) => {
  try {
    const cachedData = await redis.get(key);
    
    if (!cachedData) return null;

    return isObject ? JSON.parse(cachedData) : cachedData;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
};

export const setCache = async (key: string, data: any, expirationTime: number, isObject: boolean) => {
  try {
    const value = isObject ? JSON.stringify(data) : data;
    await redis.set(key, value, 'EX', expirationTime);
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