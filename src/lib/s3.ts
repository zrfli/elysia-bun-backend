import { S3Client } from "bun";

const s3 = new S3Client({
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  endpoint: process.env.MINIO_END_POINT,
  //bucket: process.env.MINIO_BUCKET_ID,
  //region: process.env.MINIO_REGION
});

export default s3;