const User = require("../models/User");
const sequelize = require('../setup/db');
const admin = require('../setup/firebase');
const { ADMIN_FIRSTNAME, ADMIN_LASTNAME, ADMIN_EMAIL, ADMIN_MOBILE, ADMIN_PASSWORD, ADMIN_WING, ADMIN_FLATNUMBER } = require('../setup/secrets');

const createAdmin = async (firstName, lastName, email, mobile, password, buildingWing, roomNumber) => {
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
            buildingWing: buildingWing,
            roomNumber: roomNumber,
            role: 1,
            createdOn: new Date()
        }, { transaction });

        console.log('Creating admin user in firebase...');
        const response = await admin.auth().createUser({
            uid: user.dataValues?.userId?.toString(),
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

createAdmin(ADMIN_FIRSTNAME, ADMIN_LASTNAME, ADMIN_EMAIL, ADMIN_MOBILE, ADMIN_PASSWORD, ADMIN_WING, ADMIN_FLATNUMBER);