const { DataTypes } = require('sequelize');
const sequelize = require('../setup/db');

const Maintenance = sequelize.define('Maintenance', {

  maintenanceId: {
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
  month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
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
}, {
  schema: 'public',
  tableName: 'Maintenance',
  timestamps: false
});

module.exports = Maintenance;