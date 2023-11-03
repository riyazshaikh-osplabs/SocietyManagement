'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {

      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      createdOn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedOn: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      deletedOn: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deletedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      lastLoggedInOn: {
        type: Sequelize.DATE,
        allowNull: true
      },
      activationStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      activationStatusUpdatedOn: {
        type: Sequelize.DATE,
        allowNull: true
      },
      activationStatusUpdatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      mobile: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      firstName: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      lastName: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      buildingWing: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'Building',
          key: 'buildingWing'
        }
      },
      roomNumber: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: 'Floor',
          key: 'roomNumber'
        }
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Role',
          key: 'roleId'
        }
      },
      verificationDocument: {
        type: Sequelize.BLOB,
        allowNull: true
      },
    }, {
      schema: 'public',
      tableName: 'User',
      timestamps: false
    });

    await queryInterface.addIndex({
      schema: 'public',
      tableName: 'User',
    }, {
      name: 'uniqueEmail',
      fields: ['email'],
      unique: true,
      where: {
        isDeleted: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'User'
    });
  }
};