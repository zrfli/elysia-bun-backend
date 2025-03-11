import { prisma } from "../lib/prisma";
import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";

interface Props { userId: string }

export const getAllLessons = async ({ userId }: Props) => {
  try {
    const cacheKey = `${CACHE.lessons.KEY_PREFIX}:${userId}`;
    const cacheExpirationTime = CACHE.lessons.EXPIRATION_TIME;;

    const cachedLessons = await getCache(cacheKey);

    if (cachedLessons) return cachedLessons;

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

    await setCache(cacheKey, lessons, cacheExpirationTime);

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw new Error('Failed to fetch lessons from the database');
  }
};
