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

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeTeamName' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayTeamName' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeamName' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeamName' });

export default Match;
