import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoardService';

const leaderBoardController = {
  async leaderBoard(_req: Request, res: Response) {
    const matchs = await leaderBoardService.filterHomeTeam();

    res.status(200).json(matchs);
  },
};

export default leaderBoardController;
