import { sequelize } from '../setup/db.js';
import { sendResponse } from '../utils/api.js';
import { signUp } from '../models/helpers/index.js';
import { signInFirebase, signUpFirebase } from '../utils/firebase.js';
import { encryptPassword, validatePassword } from '../utils/bcrypt.js';
import logger from '../setup/logger.js';

const SignUp = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    logger.log([req.body]);
    try {
        const { firstName, lastName, password, email, mobile, roomNumber, role, address } = req.body;

        logger.debug(`Encrypting your password`);
        const hashedPassword = await encryptPassword(password);
        logger.debug(`Your password encrypted successfully`);

        logger.debug(`Signup with database for email ${email}`);
        const user = await signUp(firstName, lastName, hashedPassword, email, mobile, roomNumber, role, address, true, false, true, transaction);
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
            roomNumber: user?.dataValues?.roomNumber,
            address: user?.dataValues?.address,
            role: user?.dataValues?.role
        };
        logger.debug(userSignup);

        sendResponse(res, 200, 'Admin user created successfully', [userSignup]);
    } catch (error) {
        logger.error(error);
        logger.debug('Rolling back any database transactions');
        await transaction?.rollback();
        next(error);
    }
}

const SignIn = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    try {
        const { email, password } = req.body;
        const { userId } = req.payload;

        logger.debug(`Validating your password`);
        const hashedPassword = await encryptPassword(password);
        const isPasswordValid = await validatePassword(password, hashedPassword);
        if (!isPasswordValid) { return logger.debug(`Your password is invalid`) }
        logger.debug(`Your password is validated successfully`);

        logger.debug(`Signin with firebase with userId ${userId}`);
        const user = await signInFirebase(email, password);
        logger.debug(`Signin successfully with firebase for userId ${userId}`);

        logger.debug(`Commiting transactions to the database`);
        await transaction?.commit();
        logger.log(`Admin user loggedIn successfully`);

        sendResponse(res, 200, 'Admin user loggedIn successfully', [user]);
    } catch (error) {
        logger.error(error);
        logger.debug(`Rolling back any database transactions`);
        await transaction?.rollback();
        next(error);
    }
}

export {
    SignUp,
    SignIn
};
