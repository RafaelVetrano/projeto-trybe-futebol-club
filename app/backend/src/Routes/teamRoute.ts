import { Router } from 'express';
import teamController from '../api/controllers/teamController';

const route = Router();

route.get('/', teamController.allTeams);
route.get('/:id', teamController.team);

export default route;
