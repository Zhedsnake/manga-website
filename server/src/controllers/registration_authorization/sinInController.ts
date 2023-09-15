import { config } from "dotenv";
config();

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User';

async function sinINController(req: Request, res: Response) {
const { login, password } = req.body;

  try {
      // Проверяем существование пользователя
      let user = await User.findOne({ login });
      if (!user) {
        return res.status(400).json({ msg: 'Login or password is incorrect' });
      }

      // Проверяем совпадение хэшированного пароля
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Login or password is incorrect' });
      }
      
      // Создаем JWT токен
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '30 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export default sinINController;