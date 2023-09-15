import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// Создаем пользовательский интерфейс (тип) для объекта req, чтобы TypeScript знал о свойстве user
interface CustomRequest extends Request {
  user?: any;
}

interface DecodedToken {
  user: { id: string }; // Замените на фактическую структуру вашего декодированного токена
}

// Экспортируем middleware как функцию, принимающую три аргумента:
export default function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  // Получаем токен из заголовка запроса
  const token = req.header('x-auth-token');

  // Проверяем, есть ли токен
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }  

  // Проверяем действительность токена
  try {
        
    // Верифицируем токен с использованием секретного ключа из переменной окружения (process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Если токен действительный, добавляем декодированные данные пользователя в объект req и переходим к следующему middleware
    if (decoded) {
      req.user = decoded?.user; // Исправляем здесь, чтобы присвоить user из декодированных данных
      next();
    } else {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (err) {
    console.error('Something went wrong with auth middleware');
    res.status(500).json({ message: 'Server Error' });
  }
};
