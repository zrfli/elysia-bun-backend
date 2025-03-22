import { prisma } from "../lib/prisma";
import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";
import { minioClient } from "../lib/minio";

interface Props { 
  userId: string;
  bucketId?: string;
}

export const getAvatar = async ({ userId, bucketId }: Props) => {
  try {
    if (!userId || !bucketId) return null;

    const cacheKey = `${CACHE.avatar.KEY_PREFIX}:${userId}`;
    const cacheExpirationTime = CACHE.avatar.EXPIRATION_TIME;
    
    const cachedAvatar = await getCache(cacheKey, false);

    if (cachedAvatar) return cachedAvatar;

    const s3Data = await minioClient.presignedGetObject(
      bucketId,
      `avatar/${userId}.png`,
      24 * 60 * 60
    );

    if (!s3Data) return null;

    await setCache(cacheKey, s3Data, cacheExpirationTime, false);

    return s3Data;
  } catch (error) {
    console.error('Error fetching avatar:', error);
    throw new Error('Failed to fetch avatar from the S3 server');
  }
};
