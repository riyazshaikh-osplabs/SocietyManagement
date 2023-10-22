const { DataTypes, literal } = require('sequelize');
const sequelize = require('../setup/db');

const User = sequelize.define('User', {

  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  createdOn: {
    type: DataTypes.DATE,
    allowNull: false
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  },
  lastLoggedInOn: {
    type: DataTypes.DATE,
    allowNull: true
  },
  activationStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  activationStatusUpdatedOn: {
    type: DataTypes.DATE,
    allowNull: true
  },
  activationStatusUpdatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'userId'
    }
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mobile: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  flatNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Role',
      key: 'roleId'
    }
  },
  verificationDocument: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  schema: 'public',
  tableName: 'User',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: 'email',
      where: {
        IsDeleted: false
      },
      name: 'uniqueEmail'
    }
  ]
});

module.exports = User;