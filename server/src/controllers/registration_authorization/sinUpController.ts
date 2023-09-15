import { config } from "dotenv";
config();

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { UserModel, UserDocument } from '../../models/User';


async function sinUpController(req: Request, res: Response) {
  const { login, password } = req.body;
  
  try {
    // Проверяем, существует ли пользователь с указанным логином
    const user: UserModel | null = await User.findOne({ login });
    if (user) {
      return res.status(400).json({ message: 'Login already exists' });
    }

    // Создаем нового пользователя
    const newUser = new User({
      login,
      password,
    }) as UserDocument;

    // Хэшируем пароль пользователя
    const salt: string = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();

    // Генерируем JWT токен для пользователя
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '7 days' },
      (err: Error | null, token: string | undefined) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export default sinUpController;