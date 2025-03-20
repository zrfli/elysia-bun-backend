import { Role } from "./lib/Roles";
import { getUserFromToken } from "./lib/jwt";

export async function authenticate(headers: Record<string, string | undefined>) {
  if (!headers.authorization) return { error: { status: "error", message: "Access denied. No token provided." }, user: null };

  const user = await getUserFromToken(headers.authorization);

  if (!user?.userId) return { error: { status: "error", message: "Access denied. Invalid token." }, user: null };

  return { error: null, user };
}

export function authorize(user: any, allowedRoles: Role[]) {
  if (!user || !allowedRoles.includes(user.role)) return { status: "error", message: "You do not have permission to access this resource." };

  return null;
}