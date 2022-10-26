import { Request, Response } from 'express';
// import { JwtPayload } from 'jsonwebtoken';
import getToken from '../../JWT/tokenGenerate';
import loginService from '../services/loginService';
import Usermodel from '../../database/models/User';

const loginController = {
  async authLogin(req: Request, res: Response) {
    const { email } = req.body;
    const user = await loginService.getUser(email) as Usermodel;
    const token = getToken(email, user.username);
    return res.status(200).json({
      token,
    });
  },

  // async getUserRole(req: Request, res: Response) {
  //   const token = req.header('Authorization');
  //   if (!token) {
  //     res.status(402).json({ message: 'token not found' });
  //   } else {
  //     const payLoad = loginService.decode(token) as JwtPayload;

  //     const { email } = payLoad;

  //     const user = await Usermodel.findOne({
  //       where: { email },
  //     });

  //     res.status(200).json({ role: user?.role });
  //   }
  // },
};

export default loginController;
