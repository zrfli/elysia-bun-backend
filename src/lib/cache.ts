import { redis } from "../lib/redis";

export const getCache = async (key: string, redisDbKey: number, isObject: boolean) => {
  //redis.connect();

  try {
    //redis.select(redisDbKey);

    const result = await redis.get(key);

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
  //redis.connect();

  try {
    const value = isObject ? JSON.stringify(data) : data;

    //redis.select(redisDbKey);
    const insertCache = await redis.set(key, value, 'EX', expirationTime);

    if (!insertCache) console.log('insert error!');
  } catch (error) {
    console.error("Redis set error:", error);
  }
};

export const deleteCache = async (key: string, redisDbKey: number) => {
  try {
    //pipeline.select(redisDbKey);
    await redis.del(key);
  } catch (error) {
    console.error("Redis delete error:", error);
  }
};
