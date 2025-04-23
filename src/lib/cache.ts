import { redisClient } from "../lib/redis";

export const getCache = async (key: string, redisDbKey: number, isObject: boolean) => {
  try {
    const pipeline = redisClient.pipeline();

    pipeline.select(redisDbKey);
    pipeline.get(key);

    const result = await pipeline.exec();

    if (!result || result.length < 2 || result[1][0]) return null;

    const value = result[1][1];

    if (typeof value !== 'string') return null; 

    return isObject ? JSON.parse(value) : value;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
};

export const setCache = async (key: string, data: any, expirationTime: number, redisDbKey: number, isObject: boolean) => {
  console.log("set cache");

  try {
    const pipeline = redisClient.pipeline();

    const value = isObject ? JSON.stringify(data) : data;

    pipeline.select(redisDbKey);
    pipeline.set(key, value, 'EX', expirationTime);

    await pipeline.exec();
  } catch (error) {
    console.error("Redis set error:", error);
  }
};

export const deleteCache = async (key: string, redisDbKey: number) => {
  try {
    const pipeline = redisClient.pipeline();

    pipeline.select(redisDbKey);
    pipeline.del(key);

    await pipeline.exec();
  } catch (error) {
    console.error("Redis delete error:", error);
  }
};
