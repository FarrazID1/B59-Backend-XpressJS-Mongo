import dotenv from 'dotenv';

dotenv.config();

export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET: string =
  process.env.CLOUDINARY_API_SECRET || '';
export const CLOUDINARY_CLOUD_NAME: string =
  process.env.CLOUDINARY_CLOUD_NAME || '';
export const DATABASE_URL: string = process.env.DATABASE_URL || '';

//? NEXT, we'll need to add this in our .env file - Tugas D13
export const SECRET: string = process.env.SECRET || 'secret';
// export const MAIL_USER: string = process.env.MAIL_USER || "";
// export const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD || "";
