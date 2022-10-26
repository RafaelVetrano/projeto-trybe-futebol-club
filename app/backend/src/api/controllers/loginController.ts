import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
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

  async getUserRole(req: Request, res: Response) {
    try {
      const tokenH = req.header('Authorization');
      if (!tokenH || tokenH === '') {
        return res.status(401).json({ message: 'token not found' });
      }
      const payLoad = await loginService.decode(tokenH) as JwtPayload;

      const { email } = payLoad;

      const user = await Usermodel.findOne({
        where: { email },
      });
      return res.status(200).json({ role: user?.role });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  },

};

export default loginController;
