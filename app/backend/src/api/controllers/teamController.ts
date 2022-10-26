import { Request, Response } from 'express';
import teamService from '../services/teamService';

const teamController = {

  async allTeams(_req: Request, res: Response) {
    const teams = await teamService.getAllTeam();
    res.status(200).json(teams);
  },

  async team(req: Request, res: Response) {
    const { id } = req.params;

    const team = await teamService.getTeamById(id);
    res.status(200).json(team);
  },

};

export default teamController;
