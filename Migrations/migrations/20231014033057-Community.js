module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Community', {

      communityId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      upVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        }
      },
      downVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'userId'
        }
      }
    }, {
      schema: 'public',
      tableName: 'Community',
      timestamps: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      schema: 'public',
      tableName: 'Community'
    })
  }
};