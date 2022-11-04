import { Router } from 'express';
import leaderBoardController from '../api/controllers/leaderBoardController';

const route = Router();

route.get('/home', leaderBoardController.leaderBoard);

export default route;
