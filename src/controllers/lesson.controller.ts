import { prisma } from "../lib/prisma";
import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";

interface Props { userId?: string }

export const getAllLessons = async ({ userId }: Props) => {
  if (!userId) return null;

  try {
    const cacheConfing = CACHE.lessons;

    const cachedLessons = await getCache(userId, cacheConfing.REDIS_DB_KEY, true);
    if (cachedLessons) return cachedLessons;

    // Veritabanından dersleri çek
    const lessons = await prisma.notes.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            instructor: {  
              select: { firstname: true, lastname: true }
            },
          },
        },
      },
    });

    await setCache(userId, lessons, cacheConfing.EXPIRATION_TIME, cacheConfing.REDIS_DB_KEY, true);
    
    //if (!cacheSuccess) console.warn(`Cache not set for key: ${cacheKey}`);

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw new Error('Failed to fetch lessons from the database');
  }
};