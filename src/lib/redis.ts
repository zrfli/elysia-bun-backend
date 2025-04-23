import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis };
const redisUrl = process.env.REDIS_URL || "";
const MAX_RETRIES = 2;

export const redisClient = globalForRedis.redis || new Redis(redisUrl, {
  retryStrategy: (times: number, reason?: Error & { code?: string }) => {
    if (reason?.code === "ENOTFOUND") {
      console.error("Redis DNS hatası, tekrar denenmeyecek:", reason);
      return null;
    }
    if (times >= MAX_RETRIES) {
      console.error(`Redis bağlantısı ${MAX_RETRIES} kez başarısız oldu, duruyor...`);
      return null;
    }
    return Math.min(times * 1000, 5000);
  }
});

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redisClient;