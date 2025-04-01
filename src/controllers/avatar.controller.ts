import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";
import s3 from "../lib/s3";

interface Props { 
  userId?: string;
  bucketId?: string;
}

export const getAvatar = async ({ userId, bucketId }: Props) => {
  if (!userId) return null;
  
  try {
    if (!userId || !bucketId) return null;
    
    const cacheConfing = CACHE.avatar;
    const cachedAvatar = await getCache(userId, cacheConfing.REDIS_DB_KEY, false);

    if (cachedAvatar) return cachedAvatar;

    const s3Data = s3.presign(`${bucketId}/avatar/${userId}.png`, { expiresIn: 6 * 60 * 60, acl: "private" });

    if (!s3Data) return null;

    await setCache(userId, s3Data, cacheConfing.EXPIRATION_TIME, cacheConfing.REDIS_DB_KEY, false);

    return s3Data;
  } catch (error) {
    console.error('Error fetching avatar:', error);
    throw new Error('Failed to fetch avatar from the S3 server');
  }
};
