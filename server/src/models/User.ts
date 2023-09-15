import mongoose, { Document, Model, Schema } from 'mongoose';

// Определение схемы пользователя
export interface UserDocument extends Document {
  login: string;
  password: string;
}

// Определение модели пользователя
export interface UserModel extends Model<UserDocument> {
  // Здесь вы можете добавить статические методы, если необходимо
}

const userSchema = new Schema<UserDocument>(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Добавление полей createdAt и updatedAt
    collection: 'users', // Имя коллекции, где будут храниться пользователи
  }
);


// Создание и экспорт модели пользователя
export const User: UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;