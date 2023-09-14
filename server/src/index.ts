import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from 'multer';

// Controllers
import uploadNewMangaController from "./controllers/uploadNewMangaController";

// Импорты .env
const PORT = process.env.PORT || 5000;
const MongoUrlLink = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Мидлвэр multer для загрузки файлов
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post("/uploadNewMangaData", upload.single(`preview`), uploadNewMangaController);


mongoose.connect(MongoUrlLink!).then(() => {
  console.log("Database connected successfully")
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
}).catch(err => console.log(err));
