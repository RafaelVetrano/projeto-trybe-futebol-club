import { Response, Request } from 'express';
import matchService from '../services/matchService';

const matchController = {
  async allMatchs(_req: Request, res:Response) {
    try {
      const matches = await matchService.getAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  },
};

export default matchController;
