const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Floor = sequelize.define('Floor', {

    floorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    buildingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Building',
            key: 'buildingId'
        }
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    floorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    schema: 'public',
    tableName: 'Floor',
    timestamps: false
});

module.exports = Floor;