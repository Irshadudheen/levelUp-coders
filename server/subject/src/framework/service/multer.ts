import multer, { StorageEngine } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Request, RequestHandler } from 'express';
import { Req } from '../types/serverPakageTypes';

// Get the current module's file path


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

// Function to check the file type
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpg|jpeg|png|gif|bmp|tiff|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

// Multer upload setup
const upload: RequestHandler = multer({
  storage,
  fileFilter: (req:Req, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    checkFileType(file, cb);
  },
}).single('image'); // Specify `.single('image')` if handling a single file upload

export default upload;
