import { DataTypes } from "sequelize";
import { sequelize } from "../setup/db.js";

const Role = sequelize.define('Role', {

    roleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    schema: 'public',
    tableName: 'Role',
    timestamps: false
})

export default Role;