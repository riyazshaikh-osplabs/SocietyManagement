'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Building', {

      buildingId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      buildingWing: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      buildingFloor: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      schema: 'public',
      tableName: 'Building',
      timestamps: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'Building'
    });
  }
};
