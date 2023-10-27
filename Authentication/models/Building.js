import { DataTypes } from "sequelize";
import { sequelize } from "../setup/db.js";

const Building = sequelize.define('Building', {

    buildingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    buildingWing: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    buildingFloor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    schema: 'public',
    tableName: 'Building',
    timestamps: false
});

export default Building;