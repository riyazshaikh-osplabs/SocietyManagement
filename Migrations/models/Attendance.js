const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Attendance = sequelize.define('Attendance', {

  attendanceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  attendanceDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  }
}, {
  schema: 'public',
  tableName: 'Attendance',
  timestamps: false
});

module.exports = Attendance;