import multer, { StorageEngine } from 'multer';
import path from 'path';

import fs from 'fs';
import { RequestHandler } from 'express';
import { Req } from '../types/serverPakageTypes';

// Directory to save the uploaded files
const uploadDir = 'uploads/';

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define the storage engine for Multer
const storage: StorageEngine = multer.diskStorage({
  destination(req: Req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req: Req, file, cb) {
    const uniqueSuffix = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

// Function to check the file type for images and videos
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpg|jpeg|png|gif|bmp|tiff|webp|mp4|avi|mov|wmv|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed!'));
  }
}

// Multer upload setup for both images and videos
const upload: RequestHandler = multer({
  storage,
  fileFilter: (req: Req, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    checkFileType(file, cb);
  },
}).single('image'); // Specify `.single('media')` to handle a single file upload of either type

export default upload;