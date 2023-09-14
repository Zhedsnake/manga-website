import { Readable } from 'stream';
import cloudinary from '../config/cloudinaryConfig';
import { Request, Response } from 'express';

// Загрузка формы с UploadNewManga на клиенте
async function uploadMangaController(req: Request, res: Response) {
  try {
    const file = req.file;
    const mangaTitle = req.body.mangaTitle;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Проверяем, является ли изображение форматом JPG
    if (!file.originalname.toLowerCase().endsWith('.jpg')) {
      return res.status(400).json({ message: 'Preview not in jpg format' });
    }

    // Обработка названия манги для создания папки
    const sanitizedMangaTitle = mangaTitle
      .trim() // Удаляем пробелы по краям
      .replace(/\s+/g, '-') // Заменяем пробелы на "-"
      .toLowerCase(); // Преобразуем в нижний регистр

    // Создаем папку на Cloudinary с использованием названия манги
    const folderPath = `Mangas/${sanitizedMangaTitle}`;
    
    // Обработка полученого файла
    const uploadedImage = {
      originalname: 'preview.jpg', // Изменяем имя на "preview.jpg"
      buffer: file.buffer,
    };

    // Загрузка изображения в созданную папку на Cloudinary
    try {
      const result = await cloudinary.uploader.upload_stream({
        resource_type: 'auto',
        public_id: `${folderPath}/preview.jpg`, // Используем папку для сохранения изображения
      }, (error, result) => {
        if (error) {
          console.error('Error uploading image:', error);
          res.status(500).json({ message: 'Image upload failed' });
          return;
        }
      });

      // Записываем содержимое буфера изображения в поток для загрузки на Cloudinary
      const imageStream = new Readable();
      imageStream.push(uploadedImage.buffer);
      imageStream.push(null);
      imageStream.pipe(result);
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ message: 'Image processing failed' });
      return;
    }

    res.status(200).json({
      message: 'Form uploaded successfully.',
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
}

export default uploadMangaController;
