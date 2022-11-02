import { verify } from 'jsonwebtoken';
import MatchModel from '../../database/models/Match';
import TeamModel from '../../database/models/Team';
import MatchBody from '../interfaces/matchBodyInterface';

const matchService = {
  async getAllMatches() {
    const matchs = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
        },
        {
          model: TeamModel,
          as: 'teamAway',
        },
      ],
    });
    return matchs;
  },

  async getById(id: string) {
    const match = await MatchModel.findOne(
      {
        where: { id },
      },
    );
    return match;
  },

  async getMatchInprogress(progress: boolean) {
    const matchs = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
        },
        {
          model: TeamModel,
          as: 'teamAway',
        },
      ],
      where: { inProgress: progress },
    });
    return matchs;
  },

  async create(payLoad: MatchBody) {
    const newMatch = await MatchModel.create(
      {
        homeTeam: payLoad.homeTeam,
        awayTeam: payLoad.awayTeam,
        homeTeamGoals: payLoad.homeTeamGoals,
        awayTeamGoals: payLoad.awayTeamGoals,
        inProgress: true,
      },
    );
    return newMatch;
  },

  async update(id: string) {
    await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  },

  async decode(token: string) {
    const payload = verify(token, 'jwt_secret');
    return payload;
  },

};

export default matchService;
