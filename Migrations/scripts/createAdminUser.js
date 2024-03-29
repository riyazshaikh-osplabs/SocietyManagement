const User = require("../models/User");
const sequelize = require('../setup/db');
const admin = require('../setup/firebase');
const { ADMIN_FIRSTNAME, ADMIN_LASTNAME, ADMIN_EMAIL, ADMIN_MOBILE, ADMIN_PASSWORD } = require('../setup/secrets');

const createAdmin = async (firstName, lastName, email, mobile, password) => {
    const transaction = await sequelize.transaction();
    try {
        console.log('Creating admin user in database...');
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            password: password,
            isAdmin: true,
            activationStatus: true,
            isDeleted: false,
            role: 1,
            roomNumber: 102,
            createdOn: new Date()
        }, { transaction });

        console.log('Creating admin user in firebase...');
        const response = await admin.auth().createUser({
            uid: user.dataValues.userId.toString(),
            email,
            password
        });

        console.log('Setting custom claims in firebase...');
        await admin.auth().setCustomUserClaims(response.uid, { admin: true });

        console.log('Commiting transactions to database...');
        await transaction.commit();
        console.log('Admin user created successfully...');

    } catch (error) {
        console.log(error);
        console.error(error);
        console.log('Rolling back database transactions...');
        await transaction.rollback();
    }

    process.exit(0);
}

createAdmin(ADMIN_FIRSTNAME, ADMIN_LASTNAME, ADMIN_EMAIL, ADMIN_MOBILE, ADMIN_PASSWORD);