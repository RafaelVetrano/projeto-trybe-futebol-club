import MatchModel from '../../database/models/Match';
import TeamModel from '../../database/models/Team';

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
};

export default matchService;
