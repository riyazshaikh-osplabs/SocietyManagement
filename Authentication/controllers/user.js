import { sequelize } from '../setup/db.js';
import { sendResponse } from '../utils/api.js';
import { signUp, updateLastLoggedIn } from '../models/helpers/index.js';
import { signInFirebase, signUpFirebase } from '../utils/firebase.js';
import logger from '../setup/logger.js';
import { encryptPassword, validatePassword } from '../utils/bcrypt.js';
import moment from 'moment';

const SignUp = async (req, res, next) => {
    const transaction = await sequelize?.transaction();
    try {
        const { firstName, lastName, password, email, mobile, buildingWing, roomNumber, role, address } = req.body;

        logger.debug(`Encrypting your password`);
        const hashedPassword = await encryptPassword(password);
        logger.debug(`Your password encrypted successfully`);

        logger.debug(`Signup with database for email: ${email}`);
        const user = await signUp(firstName, lastName, hashedPassword, email, mobile, buildingWing, roomNumber, role, address, false, false, true, transaction);
        logger.debug(`Successfully signup in the database for email: ${email}`);

        const userId = user?.dataValues?.userId;
        logger.debug(`Signup with firebase for userId: ${userId}`);
        await signUpFirebase(userId, email, password, false);
        logger.debug(`Successfully signup in firebase for userId: ${userId}`);

        logger.debug(`Committing transactions to the database`);
        await transaction?.commit();
        logger.debug(`Admin user created successfully`);

        const signupResponse = {
            firstName: user?.dataValues?.firstName,
            lastName: user?.dataValues?.lastName,
            email: user?.dataValues?.email,
            mobile: user?.dataValues?.mobile,
            roomNumber: user?.dataValues?.roomNumber,
            address: user?.dataValues?.address,
            role: user?.dataValues?.role
        };
        logger.log(`signupResponse: ${JSON.stringify(signupResponse, null, 2)}`);

        sendResponse(res, 200, 'Admin user created successfully', [signupResponse]);
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
        const { userId, dbPassword } = req.payload;

        logger.debug(`Validating your password`);
        const isPasswordValid = await validatePassword(password, dbPassword);

        if (!isPasswordValid) {
            logger.debug(`Invalid Password`);
            return sendResponse(res, 401, 'Invalid Password');
        }
        logger.debug(`Your password is validated successfully`);

        logger.debug(`Signin with firebase with userId: ${userId}`);
        const user = await signInFirebase(email, password);
        logger.debug(`Signin successfully with firebase for userId: ${userId}`);

        const signinResponse = {
            accessToken: user?.user?.accessToken,
            refreshToken: user?.user?.refreshToken,
            expiresIn: user?.user?.stsTokenManager?.expirationTime
        }

        const expirationTime = moment().add(1, 'hours');
        signinResponse.expiresIn = expirationTime.format('HH:mm:ss');

        logger.debug(`Updating the lastLoggedin time`);
        await updateLastLoggedIn(userId, transaction);
        logger.debug(`lastLoggedIn time is updated`);

        logger.debug(`Commiting transactions to the database`);
        await transaction?.commit();
        logger.log(`User loggedIn successfully`);

        logger.log(`signinResponse: ${JSON.stringify(signinResponse, null, 2)}`);
        sendResponse(res, 200, 'User loggedIn successfully', [signinResponse]);
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
}
