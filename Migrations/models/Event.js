const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Event = sequelize.define('Event', {

  eventId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  eventType: {
    type: DataTypes.ENUM('Community Hall', 'Backyard Sale', 'Society Event'),
    allowNull: false,
    validate: {
      isIn: [['Community Hall', 'Backyard Sale', 'Society Event']]
    }
  },
  eventLength: {
    type: DataTypes.ENUM('All Day', 'Single Day', 'Multiple Days'),
    allowNull: false,
    validate: {
      isIn: [['All Day', 'Single Day', 'Multiple Days']]
    }
  },
  eventBookedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  eventStart: {
    type: DataTypes.DATE,
    allowNull: true
  },
  eventEnd: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  schema: 'public',
  tableName: 'Event',
  timestamps: false
});

module.exports = Event;