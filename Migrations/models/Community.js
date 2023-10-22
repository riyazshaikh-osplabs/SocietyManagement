const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Community = sequelize.define('Attendance', {

  communityId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  upVotes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  downVotes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  }
}, {
  schema: 'public',
  tableName: 'Community',
  timestamps: false
});

module.exports = Community;