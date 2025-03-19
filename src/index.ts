import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import { cors } from '@elysiajs/cors'
import { Role } from "./lib/Roles";
import { getUserFromToken } from "./lib/jwt";
import { getAllLessons } from "./controllers/lesson.controller";
import { getAllPeriods } from "./controllers/periods.controller";
import { CLIENT_URLS } from "./CorsClient";

const app = new Elysia();

app.use(swagger()).use(cors({
  origin: CLIENT_URLS,
  allowedHeaders: "Content-Type,Authorization,Expires,Cache-Control,Pragma",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
})).listen(3001);

app.get("/api/lessons", async ({ headers }) => {
  if (!headers.authorization) return { status: "error", message: "Access denied. No token provided." };

  const user = getUserFromToken(headers.authorization);

  if (!user?.userId) return { status: "error", message: "Access denied. Invalid token." };
  if (![Role.STUDENT, Role.INSTRUCTOR].includes(user.role)) return { status: "error", message: "You do not have permission to access lessons." };

  const lessons = await getAllLessons({ userId: user.userId });

  if (!lessons || lessons.length === 0) return { status: "success", message: "No lessons found." };

  return { status: "success", userId: user.userId, data: lessons };
});

app.get("/api/periods", async ({ headers }) => {
  if (!headers.authorization) return { status: "error", message: "Access denied. No token provided." };

  const user = getUserFromToken(headers.authorization);

  if (!user?.userId) return { status: "error", message: "Access denied. Invalid token." };
  if (![Role.STUDENT, Role.INSTRUCTOR].includes(user.role)) return { status: "error", message: "You do not have permission to access lessons." };

  const periods = await getAllPeriods({ userId: user.userId });

  if (!periods || periods.length === 0) return { status: "success", message: "No periods found." };

  return { status: "success", userId: user.userId, data: periods };
});

console.log(`🦊 Elysia is running at http://localhost:3000`);