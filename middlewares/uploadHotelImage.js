import multer from 'multer';
import path from 'path';



// Carpeta donde guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads/img/users'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/\s+/g, '-');
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

export const uploadHotelImage = multer({ storage });
