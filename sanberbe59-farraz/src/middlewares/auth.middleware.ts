import { NextFunction, Request, Response } from 'express';
import { getUserData, IUserToken } from '../utils/jwt';

//TODO: Tugas D13: 1) define interface 'IRequestWithUser'
export interface IRequestWithUser extends Request {
  user?: IUserToken;
}

//TODO: Tugas D13: 2) define function 'authMiddleware'
//? --as express-request middleware > untuk memvalidasi dan mendapatkan data dari token JWT
export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  //? if authorization not found
  if (!authorization) {
    return res.status(403).json({
      message: 'unauthorized 0',
      data: null,
    });
  }

  //TODO: Tugas D13: 3) define token format > 'Bearer <token>'
  const [prefix, token] = authorization.split(' ');

  if (!(prefix === 'Bearer' && token)) {
    return res.status(403).json({
      message: 'unauthorized 1',
      data: null,
    });
  }

  //TODO: Tugas D13: 4) define function 'getUserData'
  const user = getUserData(token);

  if (!user) {
    return res.status(403).json({
      message: 'unauthorized 2',
      data: null,
    });
  }

  (req as IRequestWithUser).user = user;

  next();
};
