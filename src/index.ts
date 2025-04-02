import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { Role } from "./lib/Roles";
import { authMiddleware } from "./authMiddleware";
import { getAllLessons } from "./controllers/lesson.controller";
import { getAllPeriods } from "./controllers/periods.controller";
import { CLIENT_URLS } from "./corsClient";
import { getAvatar } from "./controllers/avatar.controller";

const app = new Elysia();

app.use(cors({
  origin: CLIENT_URLS,
  allowedHeaders: "Content-Type,Authorization,Expires,Cache-Control,Pragma",
  methods: "GET,POST,PUT,DELETE,OPTIONS"
}));

app.get("/api/lessons", async ({ headers }) => {
  const authResult = await authMiddleware(headers, [Role.STUDENT, Role.INSTRUCTOR]);
  if (!authResult.status) return { status: "error", message: authResult.message };
    
  const lessons = await getAllLessons({ userId: authResult.user?.userId});
  return lessons.length === 0 ? { status: "success", message: "No lessons found." } : { status: "success", userId: authResult.user?.userId, data: lessons };
});

/*app.get("/api/periods", async ({ headers }) => {
  const authResult = await authMiddleware(headers, [Role.STUDENT, Role.INSTRUCTOR]);
  if (!authResult.status) return { status: "error", message: authResult.message };

  const periods = await getAllPeriods({ userId: authResult.user?.userId });
  return periods.length === 0 ? { status: "success", message: "No periods found." } : { status: "success", userId: authResult.user?.userId, data: periods };
});*/

app.get("/api/avatar", async ({ headers }) => {
  const authResult = await authMiddleware(headers, [Role.STUDENT, Role.INSTRUCTOR]);
  if (!authResult.status) return { status: "error", message: authResult.message };

  const avatar = await getAvatar({ userId: authResult.user?.userId, bucketId: authResult.user?.bucketId });
  return avatar.length === 0 ? { status: "success", message: "No avatar found." } : { status: "success", userId: authResult.user?.userId, data: avatar };
});

app.get("/", () => { return "hi"; });

app.listen(process.env.PORT);

console.log(`Elysia is running.`);