import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { Role } from "./lib/roles";
import { authMiddleware } from "./authMiddleware";
import { getAllLessons } from "./handlers/lesson";
import { getAllPeriods } from "./handlers/periods";
import { getAvatar } from "./handlers/avatar";
import { CLIENT_URLS } from "./corsClient";

new Elysia()
  .use(cors({
    origin: CLIENT_URLS,
    allowedHeaders: "Content-Type,Authorization,Expires,Cache-Control,Pragma",
    methods: "GET,POST,PUT,DELETE,OPTIONS"
  }))
  .get("/api/avatar", async ({ headers }) => {
    const authResult = await authMiddleware(headers, [Role.STUDENT, Role.INSTRUCTOR]);
    if (!authResult.status) return { status: "error", message: authResult.message };
  
    const avatar = await getAvatar({ userId: authResult.user?.userId, bucketId: authResult.user?.bucketId });
    return avatar.length === 0 ? { status: "success", message: "No avatar found." } : { status: "success", userId: authResult.user?.userId, data: avatar };
  })
  .get("/api/lessons", async ({ headers }) => {
    const authResult = await authMiddleware(headers, [Role.STUDENT, Role.INSTRUCTOR]);
    if (!authResult.status) return { status: "error", message: authResult.message };
      
    const lessons = await getAllLessons({ userId: authResult.user?.userId});
    return lessons.length === 0 ? { status: "success", message: "No lessons found." } : { status: "success", userId: authResult.user?.userId, data: lessons };
  })
  .get("/api/periods", async ({ headers }) => {
    const authResult = await authMiddleware(headers, [Role.STUDENT, Role.INSTRUCTOR]);
    if (!authResult.status) return { status: "error", message: authResult.message };
  
    const periods = await getAllPeriods({ userId: authResult.user?.userId });
    return periods.length === 0 ? { status: "success", message: "No periods found." } : { status: "success", userId: authResult.user?.userId, data: periods };
  })
  .get("/health", () => { return new Response("OK"); })
  .listen(process.env.PORT || 3001);