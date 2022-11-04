import Match from '../../database/models/Match';
import Infos from '../interfaces/teamInfosInterface';
import LeaderBoardItf from '../interfaces/matchBodyTeamInterface';

const leaderBoardHelper = {
  getTeamsInfos(id: number, matchs: Match[]) {
    const tg = matchs.filter((m) => m.homeTeam === id);
    const wins = (tg.filter((m) => m.homeTeamGoals > m.awayTeamGoals)).length;
    const lost = (tg.filter((m) => m.homeTeamGoals < m.awayTeamGoals)).length;
    const draws = (tg.filter((m) => m.homeTeamGoals === m.awayTeamGoals)).length;
    const arrFavorGoals: number[] = [];
    const arrOwnGoals: number[] = [];
    const points = (wins * 3) + (draws);
    const efciencia = parseFloat(((points / (tg.length * 3)) * 100).toFixed(2));
    tg.forEach((m) => arrFavorGoals.push(m.homeTeamGoals));
    tg.forEach((m) => arrOwnGoals.push(m.awayTeamGoals));
    const favorGoals = arrFavorGoals.reduce((t, n) => t + n, 0);
    const ownGoals = arrOwnGoals.reduce((t, n) => t + n, 0);
    const balance = favorGoals - ownGoals;
    return { points, tg: tg.length, wins, draws, lost, favorGoals, ownGoals, balance, efciencia };
  },

  generateLeaderBoard(infos: Infos, nome: string) {
    const leaderBoard = {
      name: nome,
      totalPoints: infos.points,
      totalGames: infos.tg,
      totalVictories: infos.wins,
      totalDraws: infos.draws,
      totalLosses: infos.lost,
      goalsFavor: infos.favorGoals,
      goalsOwn: infos.ownGoals,
      goalsBalance: infos.balance,
      efficiency: infos.efciencia,
    };
    return leaderBoard;
  },

  sortLeaderBoard(arr: LeaderBoardItf[]) {
    const sortedArr = arr.sort((x, y) => {
      if (y.totalPoints !== x.totalPoints) return y.totalPoints - x.totalPoints;
      if (y.efficiency !== x.efficiency) return y.efficiency - x.efficiency;
      if (y.goalsBalance !== x.goalsBalance) return y.goalsBalance - x.goalsBalance;
      return y.goalsFavor - x.goalsFavor;
    });

    // if (y.totalPoints === x.totalPoints) return y.efficiency - x.efficiency;

    // if (y.totalPoints === x.totalPoints
    //   && y.efficiency === x.efficiency) return y.goalsFavor - x.goalsFavor;

    // if (y.totalPoints === x.totalPoints
    //   && y.efficiency === x.efficiency
    //   && y.goalsFavor === x.goalsFavor) return y.goalsBalance - x.goalsBalance;
    // return y.totalPoints - x.totalPoints;

    return sortedArr;
  },

};

export default leaderBoardHelper;
