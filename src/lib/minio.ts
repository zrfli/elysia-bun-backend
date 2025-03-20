import { Client } from 'minio';

export const minioClient = new Client({
  endPoint: 's3.misy.cloud',
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});
