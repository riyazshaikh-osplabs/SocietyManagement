'use strict';

const buildingData = [
  { buildingWing: 'A', buildingFloor: 15 },
  { buildingWing: 'B', buildingFloor: 15 },
  { buildingWing: 'C', buildingFloor: 15 },
  { buildingWing: 'D', buildingFloor: 15 }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ schema: 'public', tableName: 'Building' }, buildingData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ schema: 'public', tableName: 'Building' }, null, {});
  }
};