import jwt from 'jsonwebtoken';
import { SECRET } from './env';
import { Types } from 'mongoose';
import { IUser } from '../models/user.model';

//TODO: Tugas D13 : define interface - 'IUserToken'
export interface IUserToken
  // extends Omit<..> => (untuk menghilangkan property yang tidak diperlukan)
  extends Omit<
    IUser,
    | 'password'
    | 'activationCode'
    | 'isActive'
    | 'email'
    | 'fullName'
    | 'profilePicture'
    | 'username'
  > {
  id?: Types.ObjectId;
}

//TODO: Tugas D13 : define function to 'generateToken'
export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SECRET, {
    expiresIn: '1h', // Token berlaku selama 1 jam
  });
  return token;
};

//TODO: Tugas D13 : Fungsi untuk memvalidasi dan mendapatkan data dari token JWT
export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as IUserToken;
  return user;
};
