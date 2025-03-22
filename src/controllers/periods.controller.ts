import { prisma } from "../lib/prisma";
import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";

interface Props { userId: string }

export const getAllPeriods = async ({ userId }: Props) => {
  try {
    const cacheKey = `${CACHE.periods.KEY_PREFIX}:${userId}`;
    const cacheExpirationTime = CACHE.periods.EXPIRATION_TIME;;

    const cachedPeriods = await getCache(cacheKey, true);

    if (cachedPeriods) return cachedPeriods;

    const periods = await prisma.period.findMany({
      where: {
        semester: 'SPRING',
        users: {
          some: { id: userId }
        }
      },
      include: {
        notes: {
          where: { userId },
          select: {
            id: true,
            lessonId: true,
            periodId: true,
            repeatData: true,
            exempted: true,
            isConcluded: true,
            status: true,
            notes: true,
            lesson: {
              select: { 
                lessonCode: true, 
                lessonName: true,
                type: true
              }
            }
          }
        }
      }
    });

    await setCache(cacheKey, periods, cacheExpirationTime, true);

    return periods;
  } catch (error) {
    console.error('Error fetching periods:', error);
    throw new Error('Failed to fetch periods from the database');
  }
};
