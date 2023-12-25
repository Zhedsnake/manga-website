import { config } from "dotenv";
config();

import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from 'multer';


// Controllers
// registration_authorization
import sinUpController from "./controllers/registration_authorization/sinUpController";
import sinInController from "./controllers/registration_authorization/sinInController";
import userInfoController from "./controllers/registration_authorization/userInfoController";
// middlewares
import authMiddleware from "./middlewares/authMiddleware";
//
import uploadNewMangaController from "./controllers/uploadNewMangaController";


// Импорты .env
const PORT: number = parseInt(process.env.PORT || "3000", 10);

const app: Application = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Мидлвэр multer для загрузки файлов
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Регистрация и аутентифиувция
app.post("/user/register", sinUpController);
app.post("/user/login", sinInController);
app.get("/user/info", authMiddleware, userInfoController);

// Маршрут создания поста манги для переводчиков
app.post("/uploadNewMangaData", upload.single(`preview`), uploadNewMangaController);


mongoose.connect(process.env.MONGO_URL!)
.then(() => {
  console.log("Database connected successfully")
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
})
.catch(err => console.log(err));
