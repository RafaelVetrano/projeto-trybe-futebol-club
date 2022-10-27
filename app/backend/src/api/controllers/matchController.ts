import { Response, Request } from 'express';
import matchService from '../services/matchService';

const matchController = {
  async allMatchs(req: Request, res:Response) {
    const inprogress = req.query;
    if (!inprogress.inProgress) {
      const matchs = await matchService.getAllMatches();
      return res.status(200).json(matchs);
    } if (inprogress.inProgress === 'true') {
      const matchs = await matchService.getMatchInprogress(true);
      return res.status(200).json(matchs);
    }
    const matchs = await matchService.getMatchInprogress(false);
    return res.status(200).json(matchs);
  },

};

export default matchController;
