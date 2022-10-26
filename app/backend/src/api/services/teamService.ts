import TeamModel from '../../database/models/Team';

const teamService = {
  async getAllTeam() {
    const teams = TeamModel.findAll();
    return teams;
  },

  async getTeamById(id: string) {
    const team = TeamModel.findOne({
      where: { id },
    });
    return team;
  },

};

export default teamService;
