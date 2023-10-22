const { DataTypes } = require('sequelize');
const sequelize = require('../setup/db');

const Notice = sequelize.define('Notice', {

  noticeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  notice: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  issuedOn: {
    type: DataTypes.DATE,
    allowNull: false
  },
  issuedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  updatedOn: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  deletedOn: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deletedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'userId'
    }
  }
}, {
  schema: 'public',
  tableName: 'Notice',
  timestamps: false
});

module.exports = Notice;