import jwt from 'jsonwebtoken';
import { Role } from './Roles';
import { CACHE } from '../cacheConfig';
import { getCache, setCache } from './cache';

const secretKey = process.env.JWT_SECRET_KEY;

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

    if (!decoded.exp || decoded.exp < currentTime) return null;

    const cacheKey = `${CACHE.jwt.KEY_PREFIX}:${token}`;
    const cacheExpirationTime = CACHE.jwt.EXPIRATION_TIME;

    await setCache(cacheKey, decoded, cacheExpirationTime, true);

    return decoded;
  } catch (error) { return null; }
}

export async function getUserFromToken(data: string): Promise<Props | null> {
  const token = data.split(' ')[1];
  const currentTime = Math.floor(Date.now() / 1000);

  if (!token) return null;

  const cacheKey = `${CACHE.jwt.KEY_PREFIX}:${token}`;
  const cachedJwt = await getCache(cacheKey, true);

  if (cachedJwt?.exp && cachedJwt.exp > currentTime) return cachedJwt;

  return await verifyToken(token);
}
