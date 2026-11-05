import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "MONGO_URI",
  "JWT_SECRET",
  "FORGOT_PASSWORD_TOKEN",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "ADMIN_NAME",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
] as const;

// Validate required environment variables
for (const key of requiredEnvVariables) {
  if (!process.env[key]) {
    throw new Error(`${key} is not defined in environment variables`);
  }
}

type IConfig = {
  readonly PORT: number;
  readonly NODE_ENV: string;
  readonly MONGO_URI: string;
  readonly JWT_SECRET: string;
  readonly FORGOT_PASSWORD_TOKEN: string;
  readonly FRONTEND_URL: string;
  readonly BACKEND_URL: string;
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_API_SECRET: string;
  readonly RESEND_API_KEY: string;
  readonly EMAIL_FROM: string;
  readonly ADMIN_NAME: string;
  readonly ADMIN_EMAIL: string;
  readonly ADMIN_PASSWORD: string;
};

export const env: IConfig = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  FORGOT_PASSWORD_TOKEN: process.env.FORGOT_PASSWORD_TOKEN!,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  EMAIL_FROM: process.env.EMAIL_FROM!,
  ADMIN_NAME: process.env.ADMIN_NAME || "Admin",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@example.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "password",
};

export default env;
