import UserModel, { IUser } from '../models/user.model';
import { encrypt } from '../utils/encryption';
import { generateToken } from '../utils/jwt';
import { ObjectId } from 'mongoose';

//TODO: (D13): define interface - 'ILoginPayload'
//? --it is used for 'login' function - in 'auth.controller.ts'
interface ILoginPayload {
  email: string;
  password: string;
}

//TODO: Tugas D13: define service function - 'register'
export const register = async (payload: IRegisterPayload): Promise<IUser> => {
  const { email, fullName, username, password, roles } = payload;

  const user = await UserModel.create({
    email,
    fullName,
    password,
    username,
    roles,
  });

  return user;
};

//TODO: Tugas D13: define service function - 'login'
export const login = async (payload: ILoginPayload): Promise<string> => {
  const { email, password } = payload;
  const userByEmail = await UserModel.findOne({
    email,
  });

  if (!userByEmail) {
    return Promise.reject(new Error('email: user not found'));
  }

  const validatePassword: boolean = encrypt(password) === userByEmail.password;

  if (!validatePassword) {
    return Promise.reject(new Error('password: user not found'));
  }

  const token = generateToken({
    id: userByEmail._id,
    roles: userByEmail.roles,
  });

  return token;
};

interface IRegisterPayload {
  email: string;
  fullName: string;
  username: string;
  password: string;
  roles: (string | undefined)[] | undefined;
}

//TODO: Tugas D13: define service function - 'me' => get user profile by id
// -- 'me' => selected (active) user
export const me = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return Promise.reject(new Error('user not found'));
  }
  return user;
};

//TODO: Tugas D13: define service function - 'updateProfile' => update user profile
export const update_profile = async (
  userId: ObjectId,
  updateUserData: IUser
) => {
  const result = await UserModel.findByIdAndUpdate(
    userId,
    {
      ...updateUserData,
    },
    {
      new: true,
    }
  );
  if (!result) {
    return Promise.reject(new Error('failed update user'));
  }
  return result;
};
