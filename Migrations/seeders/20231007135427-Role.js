'use strict';

const rolesData = [
  { roleId: 1, role: 'Admin' },
  { roleId: 2, role: 'Chairman' },
  { roleId: 3, role: 'Treasurer' },
  { roleId: 4, role: 'Resident' },
  { roleId: 5, role: 'Staff' },
  { roleId: 6, role: 'Guest' }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ schema: 'public', tableName: 'Role' }, rolesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ schema: 'public', tableName: 'Role' }, null, {});
  }
};
