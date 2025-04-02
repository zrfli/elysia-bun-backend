import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";

interface Props { userId?: string }

export const getAllPeriods = async ({ userId }: Props) => {
  if (!userId) return null;
  
  try {
    const cacheConfing = CACHE.periods;

    const cachedPeriods = await getCache(userId, cacheConfing.REDIS_DB_KEY, true);

    if (cachedPeriods) return cachedPeriods;

    /*const periods = await prisma.period.findMany({
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
    });*/

    //await setCache(userId, periods, cacheConfing.EXPIRATION_TIME, cacheConfing.REDIS_DB_KEY, true);

    //return periods;
  } catch (error) {
    console.error('Error fetching periods:', error);
    throw new Error('Failed to fetch periods from the database');
  }
};