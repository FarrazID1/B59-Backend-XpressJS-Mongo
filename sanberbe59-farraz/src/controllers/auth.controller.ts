//TODO: D13 > 1.1) import dependencies
import { Request, Response } from 'express';
import * as Yup from 'yup';

//TODO: D13 > 1.2) import model => 'IUser'
import UserModel, { IUser } from '../models/user.model';

//TODO: D13 > 1.3) import services => 'login', 'register', 'update_profile'
import { register, login, update_profile } from '../services/auth.service';

//TODO: D13 > 1.4) import interfaces - for type validation
import { IRequestWithUser } from '../middlewares/auth.middleware';

//TODO: D13 > 1.5) import objectId from 'mongoose'
import { ObjectId } from 'mongoose';

//TODO: D13 > 2.1) define validation schema (Yup) - for 'login' and 'register'
//* --for service function 'login' (req.body) - data from user
const valLoginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

//* --for service function 'register' (req.body) - data from user
const valRegisterSchema = Yup.object().shape({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), ''],
    'Passwords must match'
  ),
  // roles: Yup.array().of(Yup.string()).optional(),
  roles: Yup.array().of(Yup.string()).optional().default([]),
  //? --make sure that the 'default value is an empty array - instead of null
});

//TODO: D13 > 2.2) define type for Login Body
type TLoginBody = Yup.InferType<typeof valLoginSchema>;
//? InferType - from Yup library - for type validation

//TODO: D13 > 2.3) define type for Register Body
type TRegisterBody = Yup.InferType<typeof valRegisterSchema>;

//TODO: D13 > 2.4) define interface for Login Request
// interface IRequestLogin extends Request<TLoginBody>{
//   body:TLoginBody
// }
interface IRequestLogin extends Request {
  body: TLoginBody;
}

//TODO: D13 > 2.5) define interface for Register Request
//? --interface - some 'types' definition in object - for type validation
interface IRequestRegister extends Request {
  body: TRegisterBody;
}

//TODO: D13 > 3.1) define export 'controller function' - 'login', 'register', 'me', 'update_profile'
export default {
  async register(req: IRequestRegister, res: Response) {
    try {
      //TODO: D13 > 3.2) catch all user data (req.body)
      const { email, fullName, username, password, confirmPassword, roles } =
        req.body;

      //? EX: test Postman => use query: POST => {base_url}/auth/register
      //? -- req.body => raw - JSON;
      // {
      //   "email": "admin@toko.com",
      //   "fullName": "Admin",
      //   "username": "admintoko",
      //   "password": "12341234",
      //   "roles":["admin"]
      // }

      //TODO: D13 > 3.3) apply validation - for 'register'
      await valRegisterSchema.validate({
        email,
        fullName,
        username,
        password,
        confirmPassword,
        roles,
      });

      // use service function => 'register'() - to create new user
      const user = await register({
        email,
        fullName,
        username,
        password,
        roles,
      });

      res.status(200).json({
        message: 'registration success!',
        data: user,
      });
      //? test Postman => return status: 200
      //? -- RESPONSE => {message: 'registration success!', data: user}
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: 'Failed register',
      });
    }
  },

  async login(req: IRequestLogin, res: Response) {
    try {
      const { email, password } = req.body;
      await valLoginSchema.validate({ email, password });

      //? EX: test Postman => use query: POST => {base_url}/auth/login
      //? -- req.body => raw - JSON;
      // {
      //   "email": "admin@toko.com",
      //   "password": "12341234"
      // }

      //define 'query result' - response
      const token = await login({ email, password });

      res.status(200).json({
        message: 'login success',
        data: token,
      });
      //? test Postman => return status: 200
      //? -- RESPONSE => {message: 'login success', data: token}
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: null,
        message: err.message,
      });
    }
  },

  async me(req: IRequestWithUser, res: Response) {
    try {
      const id = req.user?.id;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(403).json({
          message: 'user not found',
          data: null,
        });
      }

      //? EX: test Postman => use query: POST => {base_url}/auth/me
      //? -- req.body => raw - JSON;

      res.status(200).json({
        message: 'success fetch user profile',
        data: user,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: 'Failed get user profile',
      });
    }
  },

  async updateProfile(req: IRequestWithUser, res: Response) {
    try {
      const id = req.user?.id;
      const updateData: Partial<IUser> = req.body;
      //? Partial<IUser> - Update sebagian dari User

      // const result = await update_profile(id as unknown as ObjectId, req.body as IUser);
      const result = await update_profile(
        id as unknown as ObjectId,
        updateData as IUser
      );

      res.status(200).json({
        message: 'Profile updated successfully',
        data: result,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: 'Failed update user profile',
      });
    }
  },
};
