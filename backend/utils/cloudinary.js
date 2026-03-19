import dotenv from "dotenv";
dotenv.config();

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import DatauriParser from "datauri/parser.js";
import path from "path";

/* ── Multer — store in memory ── */
const storage = multer.memoryStorage();
export const upload = multer({ storage });

/* ── Cloudinary config ── */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* ── Convert buffer to base64 data URI ── */
const parser = new DatauriParser();

export const getDataUri = (file) => {
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export { cloudinary };