import { Request, Response, NextFunction } from 'express';
import { compareSync } from 'bcryptjs';
import Login from '../interfaces/LoginInterface';
import loginService from '../services/loginService';

const loginValidation = {
  verifyLogin(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body as Login;
    if (!email || !password) {
      // talvez 'rertun' necessario
      res.status(400).json({ message: 'All fields must be filled' });
    } else {
      next();
    }
  },

  async verifyPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await loginService.getUser(email);
    if (user === null || !compareSync(password, user.password)) {
      res.status(401).json({ message: 'Incorrect email or password' });
    } else {
      res.locals.user = user;
      next();
    }
  },
};

export default loginValidation;
