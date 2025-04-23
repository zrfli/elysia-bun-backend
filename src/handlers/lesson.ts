import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";
import { db } from "../lib/db";

interface Props { userId?: string }

export const getAllLessons = async ({ userId }: Props) => {
  if (!userId) return null;

  try {
    const cacheConfing = CACHE.lessons;
    const semester = 'SPRING';
    const periodId = 'c12d4575-d3d3-4a42-bb19-61409470331c';

    const cachedLessons = await getCache(userId, cacheConfing.REDIS_DB_KEY, true);
    if (cachedLessons) return cachedLessons;

    const lessons = await db`SELECT
                              to_jsonb (note) AS note,
                              to_jsonb (lesson) AS lesson,
                              to_jsonb (instructor) AS instructor,
                              period
                            FROM
                              "note"
                              INNER JOIN "lesson" ON "note"."lesson_id" = "lesson"."id"
                              INNER JOIN "instructor" ON "lesson"."instructor_id" = "instructor"."id"
                              INNER JOIN "note_to_period" ON "note_to_period"."note_id" = "note"."id"
                              INNER JOIN "period" ON "period"."id" = "note_to_period"."period_id"
                            WHERE
                              ("note"."user_id" = ${userId} AND "period"."id" = ${periodId} AND "period"."semester" = ${semester})`;

    await setCache(userId, lessons, cacheConfing.EXPIRATION_TIME, cacheConfing.REDIS_DB_KEY, true);
    
    //if (!cacheSuccess) console.warn(`Cache not set for key: ${cacheKey}`);

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw new Error('Failed to fetch lessons from the database');
  }
};