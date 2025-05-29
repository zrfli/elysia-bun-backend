export const CACHE = {
  jwt: {
    EXPIRATION_TIME: 3600,
    KEY_PREFIX: "jwt",
    REDIS_DB_KEY: 0 
  },
  avatar: {
    EXPIRATION_TIME: 21600,
    KEY_PREFIX: "avatar",
    REDIS_DB_KEY: 1
  },
  lessons: {
    EXPIRATION_TIME: 3600,
    KEY_PREFIX: "lessons",
    REDIS_DB_KEY: 2 
  },
  periods: {
    EXPIRATION_TIME: 3600,
    KEY_PREFIX: "periods",
    REDIS_DB_KEY: 3
  },
  users: {
    EXPIRATION_TIME: 86400,
    KEY_PREFIX: "users",
    REDIS_DB_KEY: 9
  },
};