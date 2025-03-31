import jwt from 'jsonwebtoken';
import { Role } from './Roles';
import { CACHE } from '../cacheConfig';
import { getCache, setCache } from './cache';

const secretKey = process.env.JWT_SECRET_KEY;
const cacheConfing = CACHE.jwt;

if (!secretKey) throw new Error("JWT_SECRET_KEY is not defined in environment variables.");

interface Props {
  userId: string;
  username: string;
  email: string;
  role: Role;
  bucketId?: string;
  exp: number;
}

export async function verifyToken(token: string): Promise<Props | null> {
  try {
    const decoded = jwt.verify(token, secretKey as string) as Props;
    const currentTime = Math.floor(Date.now() / 1000);

    if (!decoded || !decoded.exp || decoded.exp < currentTime) return null;

    await setCache(token, decoded, cacheConfing.EXPIRATION_TIME, cacheConfing.REDIS_DB_KEY, true);

    return decoded;
  } catch (error) { return null; }
}

export async function getUserFromToken(data: string): Promise<Props | null> {
  const tokenParts = data.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') return null;

  const token = tokenParts[1];
  const currentTime = Math.floor(Date.now() / 1000);
  const cachedJwt = await getCache(token, cacheConfing.REDIS_DB_KEY, true);

  if (cachedJwt?.exp && cachedJwt.exp > currentTime) return cachedJwt;
  
  //TODO: delete expired token

  return await verifyToken(token);
}