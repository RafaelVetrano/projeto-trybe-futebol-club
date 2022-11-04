import LeaderBoardItf from '../interfaces/matchBodyTeamInterface';
import leaderBoardHelper from '../Helpers/leaderBoradHelper';
import matchService from './matchService';
import teamService from './teamService';

const leaderBoardService = {
  async filterHomeTeam() {
    const leaderBoardArr: LeaderBoardItf[] = [];
    const matchs = await matchService.getMatchInprogress(false);
    const teams = await teamService.getAllTeam();
    teams.forEach(async (item) => {
      const teamInfos = leaderBoardHelper.getTeamsInfos(item.id, matchs);
      const leaderBoards = leaderBoardHelper.generateLeaderBoard(teamInfos, item.teamName);
      leaderBoardArr.push(leaderBoards);
    });
    const sortedArr = leaderBoardHelper.sortLeaderBoard(leaderBoardArr);
    return sortedArr;
  },
};

export default leaderBoardService;
