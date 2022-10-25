import { Router } from 'express';
import loginValidation from '../api/middlewares/loginValidation';

const route = Router();

route.post('/', loginValidation);

export default route;
