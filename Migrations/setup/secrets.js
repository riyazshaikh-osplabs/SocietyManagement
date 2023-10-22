require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    ADMIN_FIRST_NAME: process.env.ADMIN_FIRST_NAME,
    ADMIN_LAST_NAME: process.env.ADMIN_LAST_NAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_MOBILE: process.env.ADMIN_MOBILE,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}