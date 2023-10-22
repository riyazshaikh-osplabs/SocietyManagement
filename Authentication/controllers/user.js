import { sequelize } from '../setup/db.js';
import { sendResponse } from '../utils/api.js';
import logger from '../setup/logger.js';

const SignUp = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        // Perform the user signup logic here
        sendResponse(res, 200, 'User loggedIn successfully', data);
    } catch (error) {
        logger.error(error);
        logger.debug(`Rolling back any database transaction`);
        await transaction.rollback();
    }
}

export { SignUp };
