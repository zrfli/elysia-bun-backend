import { redisClient } from "../lib/redis";

export const getCache = async (key: string, redisDbKey: number, isObject: boolean) => {
  try {
    await redisClient.select(redisDbKey);

    redisClient.get(key);

    const data = await redisClient.exec();

    if (data) return null;

    if (isObject && data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing cached data:", error);
        return null;
      }
    }

    return data;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
};

export const setCache = async (key: string, data: any, expirationTime: number, redisDbKey: number, isObject: boolean) => {
  try {
    await redisClient.select(redisDbKey);

    const value = isObject ? JSON.stringify(data) : data;

    redisClient.set(key, value, 'EX', expirationTime);

    await redisClient.exec();
  } catch (error) {
    console.error("Redis set error:", error);
  }
};

export const deleteCache = async (key: string, redisDbKey: number) => {
  try {
    await redisClient.select(redisDbKey);

    redisClient.del(key);

    await redisClient.exec();
  } catch (error) {
    console.error("Redis delete error:", error);
  }
};