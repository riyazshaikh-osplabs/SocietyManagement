const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Invoice = sequelize.define('Attendance', {

  invoiceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  sellerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Event',
      key: 'eventId'
    }
  }
}, {
  schema: 'public',
  tableName: 'Invoice',
  timestamps: false
});

module.exports = Invoice;