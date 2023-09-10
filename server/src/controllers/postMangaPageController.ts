import express, { Request, Response } from 'express';
import multer from 'multer';
// import multer-storage-cloudinary as cloudinaryStorage from 'multer-storage-cloudinary';

import cloudinary from '../config/cloudinaryConfig';

const router = express.Router();

// Мидлвэр multer для загрузки файлов
const upload = multer({ dest: 'uploads/' });

// Маршрут для загрузки изображений
router.post('/upload', upload.single('image'), (req: Request, res: Response) => {
  console.log(req.file) // to see what is returned to you
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;

  // Загрузка файла на Cloudinary
  cloudinary.uploader.upload(filePath, (result) => {
    // Удаление временного файла после загрузки на Cloudinary
    const fs = require('fs');
    fs.unlinkSync(filePath);

    if (result && result.secure_url) {
      res.status(200).json({ imageUrl: result.secure_url });
    } else {
      res.status(500).json({ message: 'Image upload failed' });
    }
  });
  res.status(200).json({ message: 'Image uploaded successfully.' });
});




// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "demo",
//   allowedFormats: ["jpg"],
// });
// const parser = multer({ storage: storage });

// app.post('/api/images', parser.single("image"), (req, res) => {
//   console.log(req.file) // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;
//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });




export default router;
