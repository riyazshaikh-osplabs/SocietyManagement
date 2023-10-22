const { DataTypes } = require('sequelize');
const sequelize = require('../setup/db');

const Role = sequelize.define('Role', {

  roleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  schema: 'public',
  tableName: 'Role',
  timestamps: false
})

module.exports = Role;