import { Sequelize } from 'sequelize';
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, DB_MAX_CONNECTIONS_POOL, DB_MIN_CONNECTIONS_POOL, DB_ACCQUIRE_TIME, DB_IDLE_TIME } from "./secrets.js";
import logger from './logger.js';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    operatorsAliases: 0,
    logging: false,
    pool: {
        max: Number(DB_MAX_CONNECTIONS_POOL),
        min: Number(DB_MIN_CONNECTIONS_POOL),
        acquire: Number(DB_ACCQUIRE_TIME),
        idle: Number(DB_IDLE_TIME)
    }
});

sequelize.authenticate()
    .then(() => logger.log(`Connection to database: ${DB_NAME} has been established successfully.`))
    .catch(error => logger.error(`Unable to connect to database: ${DB_NAME} - ${error}`))

const setupDbConnectionCleanUp = () => {
    logger.debug(`Setting up listners for database connections cleanup if server terminated`);
    const signals = ['SIGINT', 'SIGTERM'];

    signals.forEach(signal => {
        process.on(signal, async () => {
            try {
                logger.debug(`Received signal: ${signal}`);
                logger.debug('Releasing database connections...');
                await sequelize?.close();
                logger.debug('Database connections released successfully...');
            } catch (error) {
                logger.error(`Unable to release database connection`);
            }
            logger.debug(`Killing the server...`);
            process.exit(0);
        })
    })
}
setupDbConnectionCleanUp();

export { sequelize, setupDbConnectionCleanUp }