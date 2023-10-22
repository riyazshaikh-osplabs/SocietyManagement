'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notice', {

      noticeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      notice: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      issuedOn: {
        type: Sequelize.DATE,
        allowNull: false
      },
      issuedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        }
      }
    }, {
      schema: 'public',
      tableName: 'Notice',
      timestamps: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'Notice'
    })
  }
};