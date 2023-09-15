import { config } from "dotenv";
config();

import { Request, Response } from 'express';
import User, { UserModel, UserDocument } from '../../models/User';


// Создаем пользовательский интерфейс (тип) для объекта req, чтобы TypeScript знал о свойстве user
interface CustomRequest extends Request {
  user?: any;
}

// Контроллер для получения информации о текущем пользователе
async function userInfoController(req: CustomRequest, res: Response) {
  try {
    // Используем UserModel для поиска пользователя по его идентификатору и исключаем поле пароля из результата
    const user = await User.findById(req.user.id).select('-password');

    // Отправляем успешный ответ с информацией о пользователе (без пароля) в формате JSON
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default userInfoController;
