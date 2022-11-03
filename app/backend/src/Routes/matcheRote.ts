import { Router } from 'express';
import matchController from '../api/controllers/matchController';
import middleware from '../api/middlewares/matchValidation';

const route = Router();

route.get('/', matchController.allMatchs);
route.post('/', middleware.authToken, matchController.criarMatch);
route.patch(
  '/:id/finish',
  matchController.updateMatch,
);
route.patch('/:id', matchController.updateMatchGoals);

export default route;
