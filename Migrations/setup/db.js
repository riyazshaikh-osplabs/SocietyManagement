const { Sequelize } = require('sequelize');
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = require('./secrets');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
    dialectOptions: {},
})

module.exports = sequelize;