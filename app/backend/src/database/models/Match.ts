import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});
Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });
Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
