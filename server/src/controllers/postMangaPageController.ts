import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig';
// import multer-storage-cloudinary as cloudinaryStorage from 'multer-storage-cloudinary';

const router = express.Router();

// Мидлвэр multer для загрузки файлов
const upload = multer({ dest: 'uploads/' });

// Маршрут для загрузки изображений
router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
  // console.log(req.file) // to see what is returned to you
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Загрузка файла на Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // Удаление временного файла после загрузки на Cloudinary
    const fs = require('fs');
    fs.unlinkSync(filePath);

    // if (result && result.secure_url) {
    if (result) {
      res.status(200).json({
        // imageUrl: result.secure_url,
        message: 'Image uploaded successfully.'
      });
    } else {
      res.status(500).json({ message: 'Image upload failed' });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

export default router;


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