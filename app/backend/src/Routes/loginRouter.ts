import { Router } from 'express';
import loginController from '../api/controllers/loginController';
import loginValidation from '../api/middlewares/loginValidation';

const route = Router();

route.post(
  '/',
  loginValidation.verifyLogin,
  loginValidation.verifyPassword,
  loginController.authLogin,
);

route.get(
  '/validate',
  loginValidation.verifyAuthentication,
  loginController.getUserRole,
);

export default route;
