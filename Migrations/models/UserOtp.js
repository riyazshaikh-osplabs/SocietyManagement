const { DataTypes } = require('sequelize');
const sequelize = require("../setup/db");

const UserOtp = sequelize.define('UserOtp', {

    otpId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'User',
            key: 'userId'
        }
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiryOn: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    schema: 'public',
    tableName: 'UserOtp',
    timestamps: false
});

module.exports = UserOtp;
