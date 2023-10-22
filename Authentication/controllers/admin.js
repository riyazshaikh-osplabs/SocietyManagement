import { sequelize } from '../setup/db.js';
import { sendResponse } from '../utils/api.js';
import { signUp } from '../models/helpers/index.js';
import { signUpFirebase } from '../utils/firebase.js';
import { encryptPassword } from '../middlewares/authRequest.js';
import logger from '../setup/logger.js';

const SignUp = async (req, res, next) => {
    console.log(req.body);
    const transaction = await sequelize.transaction();
    try {
        const { firstName, lastName, password, email, mobile, flatNumber, role, address } = req.body;

        logger.debug(`Encrypting your password`);
        const hashedPassword = await encryptPassword(password);
        logger.debug(`Your password encrypted successfully`);

        logger.debug(`Signup with database for email ${email}`);
        const user = await signUp(firstName, lastName, hashedPassword, email, mobile, flatNumber, role, address, true, false, true, transaction);
        logger.debug(`Successfully signup in the database for email ${email}`);

        const userId = user?.dataValues?.userId;
        logger.debug(`Signup with firebase for userId ${userId}`);
        await signUpFirebase(userId, email, password, true);
        logger.debug(`Successfully signup in firebase for userId ${userId}`);

        logger.debug(`Committing transactions to the database`);
        await transaction?.commit();
        logger.debug(`Admin user created successfully`);

        const userSignup = {
            firstName: user?.dataValues?.firstName,
            lastName: user?.dataValues?.lastName,
            email: user?.dataValues?.email,
            mobile: user?.dataValues?.mobile,
            flatNumber: user?.dataValues?.flatNumber,
            address: user?.dataValues?.address,
            role: user?.dataValues?.role
        };

        sendResponse(res, 200, 'Admin user created successfully', [userSignup]);
    } catch (error) {
        logger.error(error);
        logger.debug('Rolling back any database transactions');
        await transaction?.rollback();
        next(error);
    }
}

export { SignUp };
