import { getCache, setCache } from "../lib/cache";
import { CACHE } from "../cacheConfig";
import { db } from "../db";
import { instructor, lesson, note, period } from "../db/schema";
import { eq, and } from "drizzle-orm";

interface Props { userId?: string }

export const getAllLessons = async ({ userId }: Props) => {
  if (!userId) return null;

  try {
    const cacheConfing = CACHE.lessons;

    const cachedLessons = await getCache(userId, cacheConfing.REDIS_DB_KEY, true);
    if (cachedLessons) return cachedLessons;
    
    const lessons = await db
      .select()
      .from(note)
      .leftJoin(lesson, eq(note.lessonId, lesson.id))
      .leftJoin(instructor, eq(lesson.instructorId, instructor.id))
      .leftJoin(period, eq(note.periodId, period.id))
      .where(
        and(
          eq(note.userId, userId),
          eq(lesson.semester, "SPRING") 
        )
      );

    await setCache(userId, lessons, cacheConfing.EXPIRATION_TIME, cacheConfing.REDIS_DB_KEY, true);
    
    //if (!cacheSuccess) console.warn(`Cache not set for key: ${cacheKey}`);

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw new Error('Failed to fetch lessons from the database');
  }
};