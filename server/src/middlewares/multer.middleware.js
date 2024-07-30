import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Middleware to handle dynamic directory creation
const createDirectory = (dir) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const publicLink = req.body.publicLink;
    const uploadPath = path.join('uploads', publicLink);
    createDirectory(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

export default upload;
