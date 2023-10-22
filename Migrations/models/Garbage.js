const { DataTypes } = require('sequelize');
const sequelize = require('../setup/db');

const Garbage = sequelize.define('Garbage', {

  garbageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cleaningDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  schema: 'public',
  tableName: 'Garbage',
  timestamps: false
});

module.exports = Garbage;