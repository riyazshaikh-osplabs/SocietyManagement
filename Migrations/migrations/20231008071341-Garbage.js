'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Garbage', {

      garbageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      cleaningDate: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      schema: 'public',
      tableName: 'Garbage',
      timestamps: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'Garbage'
    })
  }
};