import { Router } from 'express';
import matchController from '../api/controllers/matchController';

const route = Router();

route.get('/', matchController.allMatchs);

export default route;
