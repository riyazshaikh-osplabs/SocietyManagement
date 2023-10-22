'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Event', {

      eventId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desc: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      eventType: {
        type: Sequelize.ENUM('Community Hall', 'Backyard Sale', 'Society Event'),
        allowNull: false,
        validate: {
          isIn: [['Community Hall', 'Backyard Sale', 'Society Event']]
        }
      },
      eventLength: {
        type: Sequelize.ENUM('All Day', 'Single Day', 'Multiple Days'),
        allowNull: false,
        validate: {
          isIn: [['All Day', 'Single Day', 'Multiple Days']]
        }
      },
      eventBookedBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      eventStart: {
        type: Sequelize.DATE,
        allowNull: true
      },
      eventEnd: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, {
      schema: 'public',
      tableName: 'Event',
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'Event'
    })
  }
}
