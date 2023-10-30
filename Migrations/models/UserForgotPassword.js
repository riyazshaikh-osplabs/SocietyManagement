const { DataTypes } = require('sequelize');
const sequelize = require("../setup/db");

const UserForgotPassword = sequelize.define('UserForgotPassword', {

    forgotPasswordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'userId'
        }
    },
    emailToken: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    expiryOn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    schema: 'public',
    tableName: 'UserForgotPassword',
    timestamps: false
});

module.exports = UserForgotPassword;
