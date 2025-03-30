import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { Role } from "./lib/Roles";
import { authenticate, authorize } from "./authMiddleware";
import { getAllLessons } from "./controllers/lesson.controller";
import { getAllPeriods } from "./controllers/periods.controller";
import { CLIENT_URLS } from "./CorsClient";
import { getAvatar } from "./controllers/avatar.controller";

const app = new Elysia();

app.use(cors({
  origin: CLIENT_URLS,
  allowedHeaders: "Content-Type,Authorization,Expires,Cache-Control,Pragma",
  methods: "GET,POST,OPTIONS",
}));

app.get("/api/lessons", async ({ headers }) => {
  const { error, user } = await authenticate(headers);
  
  if (error) return error;

  const authError = authorize(user, [Role.STUDENT, Role.INSTRUCTOR]);
  
  if (authError) return authError;

  const lessons = await getAllLessons({ userId: user.userId });
  return lessons.length === 0 ? { status: "success", message: "No lessons found." } : { status: "success", userId: user.userId, data: lessons };
});

app.get("/api/periods", async ({ headers }) => {
  const { error, user } = await authenticate(headers);
  
  if (error) return error;

  const authError = authorize(user, [Role.STUDENT, Role.INSTRUCTOR]);
  
  if (authError) return authError;

  const periods = await getAllPeriods({ userId: user.userId });

  return periods.length === 0 ? { status: "success", message: "No periods found." } : { status: "success", userId: user.userId, data: periods };
});

app.get("/api/avatar", async ({ headers }) => {
  const { error, user } = await authenticate(headers);
  
  if (error) return error;

  if (!user?.bucketId) return { status: "error", message: "Access denied. Invalid bucket id." };

  const authError = authorize(user, [Role.STUDENT, Role.INSTRUCTOR]);

  if (authError) return authError;

  const avatar = await getAvatar({ userId: user.userId, bucketId: user.bucketId });

  return avatar.length === 0 ? { status: "success", message: "No avatar found." } : { status: "success", userId: user.userId, data: avatar };
});

app.get("/", () => { return "hi"; })

app.listen(process.env.PORT || 3001);

console.log(`Elysia is running.`);