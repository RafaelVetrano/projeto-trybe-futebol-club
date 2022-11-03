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

  async criarMatch(req: Request, res:Response) {
    try {
      const payLoad = req.body;
      if (payLoad.homeTeam === payLoad.awayTeam) {
        return res.status(422).json(
          { message: 'It is not possible to create a match with two equal teams' },
        );
      }
      const matchs = await matchService.create(payLoad);
      res.status(201).json(matchs);
    } catch (e) {
      res.status(500).json(e);
    }
  },

  async updateMatch(req: Request, res:Response) {
    const { id } = req.params;
    await matchService.update(id);
    return res.status(200).json({ message: 'finished' });
  },

  async updateMatchGoals(req: Request, res:Response) {
    try {
      const { id } = req.params;
      const { body } = req;

      await matchService.updateGoals(id, body);
      res.status(200).json({ message: 'Updated' });
    } catch (e) {
      res.status(500).json(e);
    }
  },

};

export default matchController;
