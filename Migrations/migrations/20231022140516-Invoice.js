'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Invoice', {

      invoiceId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      item: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eventId: {
        type: Sequelize.INTEGER,
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'Invoice'
    })
  }
};