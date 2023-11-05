'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Floor', {

      floorId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      buildingId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Building',
          key: 'buildingId'
        }
      },
      roomNumber: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
      },
      floorNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isAlloted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }
    }, {
      schema: 'public',
      tableName: 'Floor',
      timestamps: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'Floor'
    });
  }
};
