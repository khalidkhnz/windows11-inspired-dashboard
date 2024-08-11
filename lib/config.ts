import dotenv from "dotenv";

dotenv.config({ path: ".env.local " });

export const config = {
  DB_URL: process.env.DB_URL!,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT!),
};
