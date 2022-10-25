import { Request, Response, NextFunction } from 'express';
import Login from '../interfaces/LoginInterface';

const loginValidation = {
  verifyLogin(req: Request, res: Response, next: NextFunction): void {
    const { email } = req.body as Login;
    if (!email) {
      res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  },
};

export default loginValidation.verifyLogin;
