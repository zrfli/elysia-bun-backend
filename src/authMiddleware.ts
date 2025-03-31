import { Role } from "./lib/Roles";
import { getUserFromToken } from "./lib/jwt";

export async function authMiddleware(headers: Record<string, string | undefined>, allowedRoles: Role[]) {
  if (!headers.authorization) return { status: false, message: "Access denied. No token provided." };

  const user = await getUserFromToken(headers.authorization);

  if (!user) return { status: false, message: "Access denied. User not found." };
  if (!user.userId) return { status: false, message: "Access denied. Invalid token." };
  if (!allowedRoles.includes(user.role)) return { status: false, message: "You do not have permission to access this resource." };

  return { status: true, user };
}